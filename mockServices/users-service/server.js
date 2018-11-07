const fs = require("fs");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const server = jsonServer.create();
const router = jsonServer.router("./db/db.json");
const openRoutes = require("./routes/openRoutes.json");

const token = "12345678";

const middlewares = [
  ...jsonServer.defaults(),
  ...[
    (req, res, next) => {
      router.db.assign(require("require-uncached")("./db/db.json")).write();
      next();
    }
  ]
];

server.use(middlewares);
server.use(bodyParser.json());

server.use((req, res, next) => {
  const index = openRoutes.findIndex(route => route == req.originalUrl);
  if (index === -1) {
    if (checkAuth(req)) {
      next();
    } else {
      res.status(403).jsonp({
        message: "forbidden"
      });
    }
  } else {
    next();
  }
});

function checkAuth(req) {
  return req.headers && req.headers.authorization === "Bearer " + token;
}

server.get("/users-service/health", (req, res) => {
  res.status(200).jsonp({
    message: "healthy"
  });
});

server.post("/auth/login", (req, res) => {
  if (req.body.email == "valid@test.com") {
    res.status(200).jsonp({
      data: token
    });
  } else {
    res.status(400).jsonp({
      message: "forbidden"
    });
  }
});

server.use((req, res, next) => {
  if (req.method === "DELETE") {
    const db = JSON.parse(fs.readFileSync("./db/db.json", "UTF-8"));
    const [, model, id] = req.originalUrl.split("/");
    const index = db[model].findIndex(user => {
      if (user === undefined || user === null) return false;
      return user.id === parseInt(id);
    });

    if (index == -1) {
      res.sendStatus(404);
    } else {
      db[model] = db[model].filter(user => {
        return user.id != parseInt(id);
      });
      fs.writeFileSync("./db/db.json", JSON.stringify(db));
      router.db.assign(require("require-uncached")("./db/db.json")).write();
      res.sendStatus(204);
    }
  } else {
    next();
  }
});

server.use(router);
server.listen(80);
