pipeline {
  agent any
  stages {
    stage('Fetch code') {
      steps {

      git branch: 'jenkins', url 'https://github.com/nejishow/GN-frontend.git'

      }
    }

    stage('Build') {
      steps {
        sh 'npm install --legacy-peer-deps'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
