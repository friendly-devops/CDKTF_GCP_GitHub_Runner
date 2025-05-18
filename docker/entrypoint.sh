#!/bin/bash

echo "127.0.1.1 \t $RESOURCE_NAME-sa-service" >> /etc/hosts
mkdir /actions-runner && cd /actions-runner
curl -o actions-runner-linux-x64-2.321.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.321.0/actions-runner-linux-x64-2.321.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.321.0.tar.gz

runnername='GCP-Cloudrun'
export RUNNER_ALLOW_RUNASROOT=true
export PAT="{GH_TOKEN}"

export TOKEN=$(curl -L   -X POST   -H "Accept: application/vnd.github+json"   -H "Authorization: Bearer $PAT"   -H "X-GitHub-Api-Version: 2022-11-28"   https://api.github.com/orgs/{REPO_OWNER}/actions/runners/registration-token | jq -r .token)

###### To deploy to personal account comment out upper line and uncomment the lower line ####
#export TOKEN=$(curl -L   -X POST   -H "Accept: application/vnd.github+json"   -H "Authorization: Bearer $ACESS_TOKEN"   -H "X-GitHub-Api-Version: 2022-11-28"   https://api.github.com{REPO_OWNER}/{REPOSITORY}/actions/runners/registration-token | jq -r .token)
./config.sh --url https://github.com/{REPO_OWNER} --runnergroup Default --token $TOKEN --ephemeral
###### To deploy to personal account comment out upper line and uncomment the lower line ####
#./config.sh --url https://github.com/{REPO_OWNER}/{REPOSITORY} --runnergroup Default --token $TOKEN --ephemeral
./run.sh &
/usr/sbin/nginx -g "daemon off;"

