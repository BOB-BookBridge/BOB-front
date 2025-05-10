// bob-front/Jenkinsfile

pipeline {
    agent any

    environment {
        TARGET_HOST = "ubuntu@13.125.29.139"
        CONTAINER_NAME = "fserver"
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
