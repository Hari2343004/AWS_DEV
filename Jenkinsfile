pipeline {
    agent any

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
                sh 'docker build -t enterprise-devops:v1 .'
            }
        }

        stage('List Docker Images') {
            steps {
                sh 'docker images'
            }
        }
    }
}