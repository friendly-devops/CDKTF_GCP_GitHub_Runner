import { Construct } from 'constructs';
import { GoogleStackBase, BaseStackProps } from './stackbase';
import { ComputeInstance } from '@cdktf/provider-google/lib/compute-instance';

export interface ComputeInstanceConfigs extends BaseStackProps {
    name: string,
    project: string,
    gcpProject: string,
    region: string,
    machineType: string,
    image: string,
}

export class ComputeInstanceStack extends GoogleStackBase {
    constructor(scope: Construct, id: string, props: ComputeInstanceConfigs) {
        super(scope, `${props.name}-${props.project}-${id}`, {
            name: props.name,
            project: props.project,
            region: props.region,
            gcpProject: props.gcpProject,
        })

        new ComputeInstance(this, `${props.name}-${id}`, {
            name: `${props.name}-compute-engine`,
            zone: `${props.region}-a`,
            project: props.gcpProject,
            machineType: props.machineType,
            deletionProtection: false,
            networkInterface: [
                {
                    network: this.network.id,
                    subnetwork: this.subnetwork.id
                }
            ],
            bootDisk: {
                initializeParams: {
                    image: props.image
                }
            },
            metadataStartupScript: `sudo apt update && sudo apt install -y tar curl wget jq; wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb; sudo dpkg -i packages-microsoft-prod.deb; rm packages-microsoft-prod.deb && sudo apt update && sudo apt install -y dotnet-sdk-6.0 && export RUNNER_ALLOW_RUNASROOT=true && sudo mkdir /actions-runner; cd /actions-runner && sudo curl -o actions-runner-linux-x64-2.321.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.321.0/actions-runner-linux-x64-2.321.0.tar.gz; sudo tar xzf ./actions-runner-linux-x64-2.321.0.tar.gz; sleep 20; sudo chown -R ${process.env.GCP_OWNER}:${process.env.GCP_OWNER} ../actions-runner && runnername='GCP-CE' && export PAT="${process.env.GH_TOKEN}"; export TOKEN=$(curl -L -X POST -H "Accept: application/vnd.github+json"   -H "Authorization: Bearer $PAT"   -H "X-GitHub-Api-Version: 2022-11-28"   https://api.github.com/orgs/${process.env.REPO_OWNER}/actions/runners/registration-token | jq -r .token) ; ./config.sh --url https://github.com/${process.env.REPO_OWNER} --runnergroup Default --token $TOKEN; ./run.sh && sudo apt upgrade -y`,
            serviceAccount: {
                email : `${process.env.COMPUTE_E_ACCOUNT}`,
                scopes : ["cloud-platform"]
            }
        });

    }
}
