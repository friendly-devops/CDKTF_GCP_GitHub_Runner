import { App } from 'cdktf';
import { BaseStackProps } from './lib/stacks/stackbase';
import { CloudRunConfigs, CloudRunStack } from './lib/stacks/cloudrun-stack'
//import { RemoteBackend } from 'cdktf'; // uncomment this line to use Terraform Cloud

const StackProps: BaseStackProps = {
    name: `${process.env.RESOURCE_NAME}`,
    project: `${process.env.RESOURCE_PROJECT}`,
    region: "us-central1",
    gcpProject: `${process.env.GCP_PROJECT}`
}

const app = new App();

const CloudRunProps: CloudRunConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    gcpProject: StackProps.gcpProject,
    region: StackProps.region,
    image: `us-central1-docker.pkg.dev/${process.env.PROJECT}/github-runner/github-runner:latest`,
}

new CloudRunStack(app, "crservice-stack", CloudRunProps)

// To deploy using Terraform Cloud comment out the above line
// And uncomment the below block of lines

/*const stack = new DnsRecordStack(app, "record-stack", RecordProps);
new RemoteBackend(stack, {
  hostname: "app.terraform.io",
  organization: process.env.CDKTF_ECS_TFC_ORGANIZATION || "",
  workspaces: {
    name: "ecs-microservices-cdktf"
  }
}); */

app.synth();
