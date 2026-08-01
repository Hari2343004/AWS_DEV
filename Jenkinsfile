pipeline {
    agent any

    stages {

        stage('Verify Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t enterprise-devops:v1 .'
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
        sh 'docker run -d --name enterprise-web -p 8081:80 enterprise-devops:v1'
           }
        }  

        stage('List Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}