pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REPO = '488435278570.dkr.ecr.ap-south-1.amazonaws.com/enterprise-devops'
        IMAGE_NAME = 'enterprise-devops'
        IMAGE_TAG = 'v1'
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Verify Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop enterprise-web || true'
                sh 'docker rm enterprise-web || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d --name enterprise-web -p 8081:80 ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Verify Running Container') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr'
                ]]) {
                    sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login \
                    --username AWS \
                    --password-stdin ${ECR_REPO}
                    '''
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh '''
                docker tag ${IMAGE_NAME}:${IMAGE_TAG} \
                ${ECR_REPO}:latest
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                docker push ${ECR_REPO}:latest
                '''
            }
        }

    }
}
stage('Deploy to EC2') {
    steps {
        sshagent(credentials: ['ec2-ssh']) {
            sh '''
            ssh -o StrictHostKeyChecking=no ec2-user@52.66.201.202 << EOF

            aws ecr get-login-password --region ap-south-1 | \
            docker login --username AWS --password-stdin \
            488435278570.dkr.ecr.ap-south-1.amazonaws.com

            docker pull 488435278570.dkr.ecr.ap-south-1.amazonaws.com/enterprise-devops:latest

            docker stop enterprise-web || true
            docker rm enterprise-web || true

            docker run -d --name enterprise-web -p 80:80 \
            488435278570.dkr.ecr.ap-south-1.amazonaws.com/enterprise-devops:latest

            EOF
            '''
        }
    }
}