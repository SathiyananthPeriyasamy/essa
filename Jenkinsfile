pipeline {
    agent any

    triggers {
        // Automatically check GitHub for new commits every 2 minutes
        pollSCM('H/2 * * * *')
    }
    //var
    environment {
        EC2_HOST = credentials('ec2-host-ip')
        EC2_USER = 'ubuntu'
        SSH_KEY_ID = 'ec2-ssh-key'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube static code analysis...'
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('SonarQube') {
                        bat "\"${scannerHome}\\bin\\sonar-scanner.bat\""
                    }
                }
            }
        }

        stage('Deploy to EC2 via SSH') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: env.SSH_KEY_ID, keyFileVariable: 'KEY_FILE')]) {
                    bat """
                        icacls "%KEY_FILE%" /inheritance:r
                        icacls "%KEY_FILE%" /grant:r *S-1-5-18:(F)
                        icacls "%KEY_FILE%" /grant:r *S-1-5-32-544:(F)
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
                        icacls "%KEY_FILE%" /grant:r *S-1-5-18:(F)
                        icacls "%KEY_FILE%" /grant:r *S-1-5-32-544:(F)
                        ssh -i "%KEY_FILE%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "docker ps --filter name=essa-frontend"
                    """
                }
            }
        }

        stage('Smoke Test') {
            steps {
                echo 'Running smoke test: validating HTTP 200 response...'
                sleep time: 3, unit: 'SECONDS'

                // Test 1: Verify container responds internally on EC2
                withCredentials([sshUserPrivateKey(credentialsId: env.SSH_KEY_ID, keyFileVariable: 'KEY_FILE')]) {
                    bat """
                        icacls "%KEY_FILE%" /inheritance:r
                        icacls "%KEY_FILE%" /grant:r *S-1-5-18:(F)
                        icacls "%KEY_FILE%" /grant:r *S-1-5-32-544:(F)
                        ssh -i "%KEY_FILE%" -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "curl -s -I http://localhost | grep '200 OK'"
                    """
                }

                // Test 2: Verify live endpoint responds with HTTP 200
                bat """
                    @echo off
                    echo Testing live endpoint http://${EC2_HOST}...
                    curl.exe -s -I http://${EC2_HOST} | findstr "200 OK"
                    if %ERRORLEVEL% NEQ 0 (
                        echo [FAIL] Smoke test failed: http://${EC2_HOST} did not return 200 OK
                        exit /b 1
                    ) else (
                        echo [PASS] Smoke test passed: http://${EC2_HOST} is healthy and live!
                    )
                """
            }
        }
    }

    post {
        always {
            echo "Pipeline execution finished."
        }
        success {
            echo "Successfully deployed to EC2! Live at http://${EC2_HOST}"
        }
        failure {
            echo "Deployment failed. Inspect the console logs above."
        }
    }
}
