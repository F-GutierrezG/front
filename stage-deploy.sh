# !/bin/bash

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker login -u gitlab-ci-token -p $DOCKER_TOKEN registry.gitlab.com"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network create --subnet=172.19.0.0/16 front-network'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker container stop $FRONT"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker container rm $FRONT"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker image rm $(docker images registry.gitlab.com/gusisoft/onelike/front/front -q)'

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} "docker run -d -p 3000:3000 --name front --network front-network --ip 172.19.0.2 $REGISTRY_REPO/$FRONT:$TAG"

ssh -o StrictHostKeyChecking=no ubuntu@${STAGE_SERVER} 'docker network connect onelike-network --ip 172.18.0.5 front'
