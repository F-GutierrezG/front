# !/bin/bash

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker login -u gitlab-ci-token -p $DOCKER_TOKEN registry.gitlab.com"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network create client-front-network'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker container stop $FRONT"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker container rm $FRONT"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker image rm $REGISTRY_REPO/$FRONT:$TAG"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker run -d -p 3000:3000 --name client-front --network client-front-network registry.gitlab.com/gusisoft/onelike/client/front/$FRONT:$TAG"
