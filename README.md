# Project Description
The purpose of this application is to handle user request based on their email and fetch their respective gravatar profile image. This application is built on node js express webserver and the app is Dockerised, Deployed on AWS ECS with Terraform.

To access the application please use this URL.
http://hudl-lb-1144501086.us-east-2.elb.amazonaws.com/avatar/derek.nordgren@hudl.com

## Steps to build the Project
### Prerequisities
* AWS Account 
* Install Node
* Install Docker
* Install Terraform
* Install AWS CLI
### 1. Create any web server and run it locally
* Create a sample node app and run it locally 
    * Create an application directory 
    * Create an npm project `npm init` 
    * Install express `npm install express`
    * Create an index.js and configure the express server routing to desired routes. #For the required content please refer to the index.js file under /src directory.   
### 2. Dockerize the Node App 
* Create a Dockerfile in your project directory #The required code is in Git repository 
### 3. Push the Node app to AWS ECR
* Use Infrastructure as code to deploy these changes
    * Create a main.tf file #The required code is in Git repository with file name main.tf 
    * `terraform init`
* Use `terraform apply` and deploy your changes 
* Push your node application image to this repository 
    * Click on the repository and click View push commands. 
    * Run the push commands locally.
        * `aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 711259912293.dkr.ecr.us-east-2.amazonaws.com` #Authenticate your Docker client to your registry.
        * `docker build -t hudl-ecr-repository` #Build your Docker Image.
        * `docker tag hudl-ecr-repository:latest 711259912293.dkr.ecr.us-east-2.amazonaws.com/hudl-ecr-repository:latest` #Tag your image.
        * `docker push 711259912293.dkr.ecr.us-east-2.amazonaws.com/hudl-ecr-repository:latest` push the image to your ECR Repository. 
### 4. Create the ECS Cluster 
The entire code is written as Infrastructure as Code. please refer to git repository main.tf file
* Create a cluster 
* Create the task for above cluster 
    * Specify the Definition.
    * Create an IAM role
    * As we are using Fargate, create reference resources to default VPC
* Create the service to launch the container. 
### 5. Create a Load Balancer and link our ECS service to our load balancer
* As part of creating load balancer specify the required target groups and security groups.
* Please refer to the terraform code.

### Web Server's hostname
http://hudl-lb-1144501086.us-east-2.elb.amazonaws.com/avatar/derek.nordgren@hudl.com 

## Steps to run the project 
1. Clone the Git repository : https://github.com/manoj0913/hudl-assesment.git
2. Run `npm install` to install project dependencies.
3. Run `npm run dev` for running the application in local.
4. The above step runs the application in development mode on port `3000`. Open http://localhost:3000/avatar/email-here in the browser or postman/insomnia tools.

## Project Statement 
In order to built the application in short time I have choosen node application. To utilize serverless approach, I have deployed the application on ECS with Fargate. I am familiar with terraform hence applied terraform for Infrastructure as code. 

Given enough time, I can Improve the security constraints by creating the Route53 hosted zone and route the traffic to load balancer with Alias Record name. We can further choose HTTPS listener by provisioning SSL/TLS certificates in AWS Certificate Manager. 