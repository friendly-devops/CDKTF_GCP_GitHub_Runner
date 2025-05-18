# AWS Wordpress ECS deployment with CDKTF
## Architecture
![ECS Microservices CDKTF-AWS](images/aws.png)
## Instructions
### This deployment requires the use of user Access Keys.
To deploy using deploy using Terraform Cloud, uncomment lines 13, 127-134 in main.ts and comment out line 122.

Comment out Config credentials in .github/workflows/deployment-workflow.yml

Add CDKTF_ECS_TFC_ORGANIZATION to the env block of CDKTF Deployment in .github/workflow/deployment-workflow.yml with the name of your organizatoin as the value.
### In the secrets and variables Actions menu, place the following key pairs
    1. GCP_PROJECT: <GCP_PROJECT>
    2. GCP_SA_EMAIL: <GCP_SA_EMAIL>
    3. GCP_STATE_BUCKET: <backend_bucket_to_store_state>
    4. COMPUTE_E_ACCOUNT: <Default Compute Engine Email>
    5. GH_TOKEN: <GH_TOKEN>
    6. GCP_OWNER: <Name of GCP Owner>

### Deploy Application:
    1. Navigate to the Actions tab
    2. Select Deployment Workflow on the left panel
    3. Select Run workflow
    4. Ensure the correct branch is selected
    6. Ensure deploy is selected in the drop down menu
    7. Run workflow

### Verify deployment by:
    1. Follow the deployment at the bmo-iac-cluster on the ECS page.
    2. Visit the FQDN created by the Route53 stack
    
### Destroy Application:
    1. Navigate to the Actions tab
    2. Select Deployment Workflow on the left panel
    3. Select Run workflow
    4. Ensure the correct branch is selected
    6. Ensure destroy is selected in the drop down menu
    7. Run workflow
