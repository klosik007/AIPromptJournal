# AWS EC2 Deployment Guide for AI Prompt Journal

## Deployment Options

### Option 1: Manual Deployment (Simplest)

#### Step 1: Launch EC2 Instance
1. Go to AWS Console → EC2 → Launch Instance
2. Choose **Ubuntu Server 22.04 LTS**
3. Instance type: **t2.micro** (free tier eligible)
4. **Key pair (login)** section:
   - Click **"Create new key pair"**
   - Key pair name: `aipromptjournal-key` (or any name you prefer)
   - Key pair type: **RSA**
   - Private key file format: **.pem** (for macOS/Linux) or **.ppk** (for Windows/PuTTY)
   - Click **"Create key pair"**
   - **IMPORTANT**: The .pem file will automatically download - save it securely!
   - Move it to a safe location: `mv ~/Downloads/aipromptjournal-key.pem ~/.ssh/`
   - Set correct permissions: `chmod 400 ~/.ssh/aipromptjournal-key.pem`
5. **Network settings**:
   - Click "Edit"
   - Security Group: Create new or select existing
   - Add rules:
     - SSH (port 22) - Source: My IP (for security)
     - HTTP (port 80) - Source: Anywhere (0.0.0.0/0)
6. Launch instance

**Note**: You can only download the .pem file ONCE during instance creation. If you lose it, you'll need to create a new key pair or use AWS Systems Manager Session Manager.

#### Step 2: Connect to EC2
```bash
# Use the key pair you downloaded
ssh -i ~/.ssh/aipromptjournal-key.pem ubuntu@your-ec2-public-ip

# If you get "Unprotected private key file" error, fix permissions:
chmod 400 ~/.ssh/aipromptjournal-key.pem
```

**To find your EC2 public IP**:
1. Go to EC2 Console → Instances
2. Select your instance
3. Copy the "Public IPv4 address" from the details panel

#### Step 3: Install Dependencies on EC2
```bash
# Update system
sudo apt-get update -y

# Install nginx
sudo apt-get install -y nginx

# Install Node.js 20 LTS (recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
node --version
npm --version
nginx -v
```

#### Step 4: Build Project Locally
```bash
# On your local machine
cd /Users/przemo/Documents/AIPromptJournal
npm install
npm run build
```

#### Step 5: Deploy to EC2
```bash
# Copy build files to EC2
scp -i your-key.pem -r build/* ubuntu@your-ec2-public-ip:/tmp/

# SSH to EC2 and move files
ssh -i your-key.pem ubuntu@your-ec2-public-ip
sudo mkdir -p /var/www/aipromptjournal
sudo mv /tmp/* /var/www/aipromptjournal/
sudo chown -R www-data:www-data /var/www/aipromptjournal
```

#### Step 6: Configure Nginx
```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/aipromptjournal
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name _;
    root /var/www/aipromptjournal;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/aipromptjournal /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 7: Access Your App
Open browser: `http://your-ec2-public-ip`

---

### Option 2: AWS CodeDeploy + CodePipeline (CI/CD)

#### Prerequisites
- GitHub/CodeCommit repository
- AWS CodeBuild
- AWS CodeDeploy
- AWS CodePipeline

#### Step 1: Prepare EC2 Instance
1. Launch EC2 with Ubuntu 22.04
2. Attach IAM role with policies:
   - `AmazonEC2RoleforAWSCodeDeploy`
   - `AmazonS3ReadOnlyAccess`
3. Install CodeDeploy agent:
```bash
sudo apt-get update
sudo apt-get install -y ruby wget
cd /home/ubuntu
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
```

#### Step 2: Create S3 Bucket
- Store build artifacts
- Name: `aipromptjournal-artifacts`

#### Step 3: Create CodeBuild Project
1. Go to CodeBuild → Create project
2. Source: Your repository
3. Environment: Ubuntu, Standard runtime
4. Buildspec: Use `buildspec.yml` from repo
5. Artifacts: S3 bucket created above

#### Step 4: Create CodeDeploy Application
1. Go to CodeDeploy → Create application
2. Compute platform: EC2/On-premises
3. Create deployment group:
   - Select your EC2 instance(s)
   - Service role with CodeDeploy permissions
   - Deployment type: In-place

#### Step 5: Create CodePipeline
1. Go to CodePipeline → Create pipeline
2. Source: Your repository
3. Build: CodeBuild project
4. Deploy: CodeDeploy application
5. Create pipeline

#### Step 6: Deploy
- Push code to repository
- Pipeline automatically builds and deploys

---

### Option 3: Using AWS Amplify (Easiest for React)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo
git push -u origin main
```

#### Step 2: Deploy with Amplify
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Amplify auto-detects React app
5. Click "Save and deploy"

Your app will be live at: `https://branch-name.amplifyapp.com`

---

## Cost Estimates

### EC2 Manual Deployment
- t2.micro: **Free tier** (750 hours/month for 12 months)
- After free tier: ~$8-10/month

### CodeDeploy + CodePipeline
- CodeDeploy: Free for EC2
- CodePipeline: $1/month per pipeline
- CodeBuild: $0.005/build minute (first 100 minutes free)

### AWS Amplify
- Free tier: 1000 build minutes, 15GB storage, 5GB served/month
- After: ~$0.01/build minute, $0.023/GB storage, $0.15/GB served

---

## Recommended Approach

**For Development/Testing**: Use AWS Amplify (easiest, no server management)

**For Production**: Use EC2 with manual deployment or CodeDeploy for full control

---

## Security Best Practices

1. **Use HTTPS**: Add SSL certificate via AWS Certificate Manager + CloudFront
2. **Restrict SSH**: Only allow your IP in security group
3. **Regular Updates**: Keep EC2 instance updated
4. **Backup**: Use EBS snapshots
5. **CloudWatch**: Monitor logs and metrics

---

## Troubleshooting

### Lost .pem file or need to change key pair on existing EC2

**Method 1: Using AWS Systems Manager Session Manager (No .pem needed)**
```bash
# Install AWS CLI and Session Manager plugin first
# Then connect without SSH key:
aws ssm start-session --target i-your-instance-id
```

**Method 2: Replace key pair manually**

1. **Create new key pair** in EC2 Console → Key Pairs → Create
2. **Stop the EC2 instance** (don't terminate!)
3. **Detach root volume**:
   - EC2 → Instances → Select instance → Storage tab
   - Click volume ID → Actions → Detach volume
4. **Launch temporary instance** with new key pair
5. **Attach old volume** to temporary instance as `/dev/sdf`
6. **SSH to temporary instance** and mount volume:
```bash
ssh -i new-key.pem ubuntu@temp-instance-ip
sudo mkdir /mnt/oldroot
sudo mount /dev/xvdf1 /mnt/oldroot
```
7. **Add new public key** to authorized_keys:
```bash
# Generate public key from your new .pem file (on local machine)
ssh-keygen -y -f new-key.pem > new-key.pub

# Copy content and add to instance (on temporary instance)
sudo nano /mnt/oldroot/home/ubuntu/.ssh/authorized_keys
# Paste the new public key content
```
8. **Unmount and reattach**:
```bash
sudo umount /mnt/oldroot
# Detach volume from temporary instance
# Reattach to original instance as /dev/sda1
# Start original instance
```
9. **Connect with new key**:
```bash
ssh -i new-key.pem ubuntu@original-instance-ip
```

**Method 3: Use EC2 Instance Connect (Easiest)**
1. Go to EC2 Console → Instances
2. Select your instance → Connect
3. Choose "EC2 Instance Connect" tab
4. Click "Connect" (opens browser terminal)
5. Add new key:
```bash
echo "your-new-public-key" >> ~/.ssh/authorized_keys
```

### Nginx not serving files
```bash
sudo chown -R www-data:www-data /var/www/aipromptjournal
sudo chmod -R 755 /var/www/aipromptjournal
```

### CodeDeploy agent not running
```bash
sudo service codedeploy-agent restart
sudo service codedeploy-agent status
```

### Build fails
- Check Node.js version matches buildspec.yml
- Verify all dependencies in package.json

---

## Next Steps

1. Choose deployment option
2. Set up domain name (Route 53)
3. Add SSL certificate
4. Configure CloudFront for CDN
5. Set up monitoring and alerts
