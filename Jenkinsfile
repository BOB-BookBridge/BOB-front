pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    environment {
        TARGET_HOST = "ubuntu@13.125.29.139"
        CONTAINER_NAME = "fserver"
        ESLINT_CACHE = 'eslint-cache'
        NPM_CONFIG_CACHE = "/var/jenkins_home/npm-cache"
        TS_CACHE = 'ts-cache'
        REMOTE_PATH = "/home/ubuntu/app"
    }

    stages {
        stage('Prepare .env.production') {
        steps {
            withCredentials([file(credentialsId: 'env-production', variable: 'ENV_PROD_FILE')]) {
                sh '''
                    cp $ENV_PROD_FILE .env.production
                    chmod 644 .env.production
                '''
            }
        }
    }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install --cache $NPM_CONFIG_CACHE --prefer-offline'
                }
            }
        }
        stage('Type Check') {
            steps {
                script {
                    sh './node_modules/.bin/tsc --noEmit --incremental'
                }
            }
        }
        stage('Lint') {
            steps {
                script {
                def changedFiles = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim().split('\n')
                def existingLintFiles = []

                for (file in changedFiles) {
                    if ((file.endsWith('.ts') || file.endsWith('.tsx')) && file != '' && file != null) {
                    if (fileExists(file)) {
                        existingLintFiles.add(file)
                    }
                    }
                }

                if (existingLintFiles.size() > 0) {
                    sh "./node_modules/.bin/eslint ${existingLintFiles.join(' ')} --cache --cache-location $ESLINT_CACHE --fix"
                } else {
                    echo "No existing lintable files changed. Skipping ESLint."
                }
                }
            }
            }
        stage('Deploy frontend container') {
            steps {
                sshagent (credentials: ['ec2-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${TARGET_HOST} '
                    docker-compose stop ${CONTAINER_NAME} || true &&
                    docker-compose rm -f ${CONTAINER_NAME} || true &&
                    docker-compose up --build -d ${CONTAINER_NAME}
                    '
                    """
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