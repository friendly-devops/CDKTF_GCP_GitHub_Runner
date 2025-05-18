import { App } from 'cdktf';
import { BaseStackProps } from './lib/stacks/stackbase';
import { ComputeInstanceConfigs, ComputeInstanceStack } from './lib/stacks/compute-engine-stack'
//import { RemoteBackend } from 'cdktf'; // uncomment this line to use Terraform Cloud

const StackProps: BaseStackProps = {
    name: `${process.env.RESOURCE_NAME}`,
    project: `${process.env.RESOURCE_PROJECT}`,
    region: "us-central1",
    gcpProject: `${process.env.GCP_PROJECT}`
}

const app = new App();

const ComputeInstanceProps: ComputeInstanceConfigs = {
    name: StackProps.name,
    project: StackProps.project,
    gcpProject: StackProps.gcpProject,
    region: StackProps.region,
    machineType: "e2-micro",
    image: "debian-11-bullseye-v20231010",
}

new ComputeInstanceStack(app, "compute-engine-stack", ComputeInstanceProps)

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
