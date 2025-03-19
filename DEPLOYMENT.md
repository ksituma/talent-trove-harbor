
# ATS Deployment Guide for Coolify

This guide provides instructions for deploying the Kenya School of Government Applicant Tracking System (ATS) to Coolify.

## Prerequisites

1. A Coolify instance running on an Ubuntu server
2. A domain name (optional, but recommended)
3. SSH access to your server
4. Git repository access for your project

## Step 1: Set Up Your Ubuntu Server

If you don't already have a server with Coolify installed:

1. Provision an Ubuntu server (Ubuntu 20.04 LTS or newer recommended)
2. Set up a non-root user with sudo privileges
3. Update your system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

## Step 2: Install Coolify

1. SSH into your server and run the automated installation script:
   ```bash
   wget -q https://get.coolify.io -O install.sh && bash ./install.sh
   ```

2. Follow the prompts to complete the installation.

3. After installation, access the Coolify dashboard by navigating to `http://YOUR_SERVER_IP:3000` in your browser.

## Step 3: Connect Your Git Repository

1. In the Coolify dashboard, go to "Sources" and click "Add new Source".
2. Choose your Git provider (GitHub, GitLab, etc.) and follow the authentication steps.
3. Select your ATS repository.

## Step 4: Create a New Service

1. In Coolify dashboard, go to "Resources" and click "New Resource".
2. Select "Application".
3. Choose your source (the Git repository you connected).
4. Select the branch you want to deploy (usually `main` or `master`).

## Step 5: Configure Environment Variables

Add the following environment variables:

```
VITE_SUPABASE_URL=https://sxysnxigsvuybqbjfxvb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4eXNueGlnc3Z1eWJxYmpmeHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5Mzc5MDQsImV4cCI6MjA1NzUxMzkwNH0.TGe3ad7RoYWeRbZVyPSItHBcAQhTolqETjGd5jN2Ri8
NODE_VERSION=18
```

## Step 6: Configure Build Settings

Set the following build configuration:

1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `npm run preview`
3. **Publish Directory**: `dist`

## Step 7: Configure Network Settings

1. Set the port to `4173` (Vite's preview port)
2. Configure your domain if you have one

## Step 8: Deploy

1. Click "Deploy" to start the deployment process
2. Monitor the deployment logs for any errors

## Step 9: Set Up Supabase Database

Before your application will work properly, you need to set up the database tables in Supabase:

1. Go to the [Supabase SQL Editor](https://supabase.com/dashboard/project/sxysnxigsvuybqbjfxvb/sql)
2. Create a new query
3. Copy and paste the contents of the `setup-jobs-applications.sql` file from your project
4. Run the query to create the necessary tables and insert sample data

## Step 10: Configure Supabase Authentication

1. Go to the [Supabase Authentication Settings](https://supabase.com/dashboard/project/sxysnxigsvuybqbjfxvb/auth/providers)
2. Add your production site URL to the Site URL and Redirect URLs list
3. If you're using email confirmation, adjust the settings as needed for production

## Step 11: Final Steps

1. Once deployed, access your application at the provided URL
2. Test the application to ensure all functionality works correctly
3. Set up SSL/TLS if not automatically configured

## Troubleshooting

If you encounter issues during deployment:

1. Check the deployment logs in Coolify
2. Verify environment variables are correctly set
3. Ensure your Supabase project is properly configured
4. Check network/firewall settings on your server

## Maintenance

To update your application:

1. Push changes to your Git repository
2. In Coolify, navigate to your service and click "Redeploy"

For server maintenance:

1. Regular system updates:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. Monitor server resources through Coolify dashboard

For any additional help or questions, please refer to the [Coolify documentation](https://coolify.io/docs).
