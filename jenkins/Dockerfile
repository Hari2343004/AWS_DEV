# ==========================================
# Enterprise DevOps Jenkins Image
# ==========================================

FROM jenkins/jenkins:lts

USER root

# Update packages and install required tools
RUN apt-get update && \
    apt-get install -y \
    git \
    docker.io \
    awscli \
    curl \
    unzip \
    wget \
    vim \
    nano \
    openssh-client && \
    apt-get clean

USER jenkins

# Install Jenkins Plugins
RUN jenkins-plugin-cli --plugins \
    workflow-aggregator \
    pipeline-stage-view \
    blueocean \
    git \
    github \
    github-branch-source \
    git-client \
    credentials \
    credentials-binding \
    ssh-agent \
    ssh-slaves \
    ssh-credentials \
    docker-workflow \
    docker-plugin \
    amazon-ecr \
    aws-credentials \
    pipeline-aws \
    terraform \
    kubernetes \
    matrix-auth \
    role-strategy \
    configuration-as-code \
    job-dsl \
    ws-cleanup \
    timestamper \
    ansicolor \
    email-ext \
    build-timeout \
    warnings-ng \
    junit \
    htmlpublisher