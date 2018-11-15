# !/bin/bash

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker login -u gitlab-ci-token -p $DOCKER_TOKEN registry.gitlab.com"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network create client-front-network'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container stop front'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker container rm front'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker image rm $REGISTRY_REPO/$FRONT:$TAG"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker run -d -p 80:3000 --name client-front --network client-front-network registry.gitlab.com/gusisoft/onelike/client/front/$FRONT:$TAG"
