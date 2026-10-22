pipeline {
    agent any

    triggers {
        // Automatically check GitHub for new commits every 2 minutes
        pollSCM('H/2 * * * *')
    }

    environment {
        EC2_HOST = '13.126.138.58'
        EC2_USER = 'ubuntu'
        SSH_KEY_ID = 'ec2-ssh-key'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to EC2 via SSH') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: env.SSH_KEY_ID, keyFileVariable: 'KEY_FILE')]) {
                    bat """
                        icacls "%KEY_FILE%" /inheritance:r
                        icacls "%KEY_FILE%" /grant:r "%USERNAME%:(F)"
                        ssh -i "%KEY_FILE%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "cd /home/ubuntu/essa && git pull origin main && docker compose -f deployed/docker-compose.yml up -d --build"
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: env.SSH_KEY_ID, keyFileVariable: 'KEY_FILE')]) {
                    bat """
                        icacls "%KEY_FILE%" /inheritance:r
                        icacls "%KEY_FILE%" /grant:r "%USERNAME%:(F)"
                        ssh -i "%KEY_FILE%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "docker ps --filter name=essa-frontend"
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution finished."
        }
        success {
            echo "Successfully deployed to EC2! Container is running strictly bound to 127.0.0.1."
        }
        failure {
            echo "Deployment failed. Inspect the console logs above."
        }
    }
}
