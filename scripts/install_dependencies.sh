#!/bin/bash
# Install dependencies on EC2 instance

# Update system
apt-get update -y

# Install nginx
apt-get install -y nginx

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install CodeDeploy agent (if using AWS CodeDeploy)
apt-get install -y ruby wget
cd /home/ubuntu
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
./install auto

echo "Installation completed!"
