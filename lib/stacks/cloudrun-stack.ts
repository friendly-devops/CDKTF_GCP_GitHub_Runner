import { Construct } from 'constructs';
import { GoogleStackBase, BaseStackProps } from './stackbase';
import { CloudRunV2Service } from '@cdktf/provider-google/lib/cloud-run-v2-service';
import { CloudRunV2ServiceIamBinding } from '@cdktf/provider-google/lib/cloud-run-v2-service-iam-binding';

export interface CloudRunConfigs extends BaseStackProps {
    name: string,
    project: string,
    gcpProject: string,
    region: string,
    image: string,
}

export class CloudRunStack extends GoogleStackBase {
    constructor(scope: Construct, id: string, props: CloudRunConfigs) {
        super(scope, `${props.name}-${props.project}-${id}`, {
            name: props.name,
            project: props.project,
            region: props.region,
            gcpProject: props.gcpProject,
        })

        const instance = new CloudRunV2Service (this, `${props.name}-${id}`, {
            name: `${props.name}-service`,
            location: props.region,
            project: props.gcpProject,
            deletionProtection: false,
            template: {
                containers: [
                    {
                        image: props.image,
                        ports: {
                            containerPort: 80
                        },
                        resources: {
                            limits: {
                                cpu: "1",
                                memory: "1024Mi"
                            }
                            
                        }
                    }
                ],
                vpcAccess: {
                    networkInterfaces: [
                        {
                            network: this.network.id,
                            subnetwork: this.subnetwork.id
                        }
                    ]
                }
            },
        });

        new CloudRunV2ServiceIamBinding (this, `${props.name}-iam-binding`, {
            location: props.region,
            name: instance.name,
            project: props.gcpProject,
            role: "roles/run.invoker",
            members: [ "allUsers" ]
        })
            
    }
}
