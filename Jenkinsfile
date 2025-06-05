pipeline {
    agent any

    environment {
        TARGET_HOST = "ubuntu@13.125.29.139"
        CONTAINER_NAME = "fserver"
        ESLINT_CACHE = 'eslint-cache'
        TS_CACHE = 'ts-cache'
    }

    stages {
        stage('Deploy frontend container') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${TARGET_HOST} '
                      docker-compose stop ${CONTAINER_NAME} || true &&
                      docker-compose rm -f ${CONTAINER_NAME} || true &&
                      docker-compose build ${CONTAINER_NAME} &&
                      docker-compose up -d ${CONTAINER_NAME}
                    '
                    """
                }
            }
        }
        stage('Lint') {
            steps {
                script {
                    sh 'eslint . --cache --cache-location $ESLINT_CACHE --parallel --fix'
                }
            }
        }
        stage('Type Check') {
            steps {
                script {
                    sh 'tsc --noEmit --incremental'
                }
            }
        }
        stage('Lint Changed Files') {
            steps {
                script {
                    def changedFiles = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim().split('\n')
                    def lintFiles = changedFiles.findAll { it.endsWith('.ts') || it.endsWith('.tsx') }
                    if (lintFiles.size() > 0) {
                        sh "eslint ${lintFiles.join(' ')} --cache --fix --parallel"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '배포 성공'
        }
        failure {
            echo '프론트엔드 배포 실패'
        }
    }
}