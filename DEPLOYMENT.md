# Kenya School of Government ATS Deployment Guide for Coolify

This guide provides detailed instructions for deploying the Kenya School of Government Applicant Tracking System (ATS) to Coolify with PostgreSQL integration.

## Prerequisites

1. A Coolify instance running on an Ubuntu server
2. A domain name (optional, but recommended)
3. SSH access to your server
4. Git repository access for your project
5. A Supabase account and project (for database)

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

## Step 3: Set Up Supabase Database

Before deploying your application, you need to set up your Supabase database:

1. Log in to your Supabase account at https://supabase.com
2. Create a new project if you don't have one already
3. Go to the SQL Editor in your Supabase project
4. Execute the SQL commands from the `setup-jobs-applications.sql` file to create the necessary tables and sample data
5. Make note of your Supabase project URL and anon key (found in Project Settings > API)

## Step 4: Connect Your Git Repository to Coolify

1. In the Coolify dashboard, go to "Sources" and click "Add new Source"
2. Choose your Git provider (GitHub, GitLab, etc.) and follow the authentication steps
3. Select your ATS repository

## Step 5: Create a New Service in Coolify

1. In Coolify dashboard, go to "Resources" and click "New Resource"
2. Select "Application"
3. Choose your source (the Git repository you connected)
4. Select the branch you want to deploy (usually `main` or `master`)

## Step 6: Configure Environment Variables

Add the following environment variables to your Coolify deployment:

```
VITE_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NODE_VERSION=18
```

Replace `YOUR_SUPABASE_PROJECT_ID` and `YOUR_SUPABASE_ANON_KEY` with the actual values from your Supabase project.

## Step 7: Configure Build Settings

Set the following build configuration:

1. **Build Command**: `npm install && npm run build`
2. **Start Command**: `npm run preview`
3. **Publish Directory**: `dist`

## Step 8: Configure Network Settings

1. Set the port to `4173` (Vite's preview port)
2. Configure your domain if you have one
3. For HTTPS configuration:
   - **Option 1 (Recommended for Production)**: Set up a proper SSL certificate
     - In Coolify dashboard, go to your service settings
     - Configure SSL using Let's Encrypt or upload your own certificate
   - **Option 2 (For Testing Only)**: Use HTTP instead
     - Access your application using http:// instead of https://
     - In the URL bar, manually change https:// to http://

## Step 9: Deploy

1. Click "Deploy" to start the deployment process
2. Monitor the deployment logs for any errors

## Step 10: Verify Setup

After deployment:

1. Access your application at the provided URL
2. Test the application to ensure all functionality works correctly:
   - Check that jobs are displayed on the jobs page
   - Verify you can view job details
   - Confirm you can apply for jobs without logging in
   - Test the admin interface and reports

## Step 11: Configure Admin Access (Optional)

If you want to secure the admin section:

1. Create a separate admin login page
2. Set up authentication for the admin section in Supabase
3. Update the RLS policies to secure admin-specific data

## Troubleshooting

If you encounter issues during deployment:

1. Check the deployment logs in Coolify
2. Verify environment variables are correctly set
3. Ensure your Supabase project is properly configured
4. Check network/firewall settings on your server

Common issues:

- **Database connection errors**: Verify your Supabase URL and anon key
- **Build failures**: Check your Node.js version and build command
- **Application errors**: Review console logs for JavaScript errors

## Troubleshooting SSL Certificate Issues

If you encounter the "NET::ERR_CERT_AUTHORITY_INVALID" error:

1. **For development/testing:**
   - Access your site using HTTP instead of HTTPS by changing the URL prefix
   - Add an SSL exception in your browser (not recommended for production use)

2. **For production:**
   - Configure a proper SSL certificate through Coolify
   - Use Let's Encrypt for free, automated SSL certificates
   - If using a custom domain, ensure DNS settings are properly configured

3. **Check SSL configuration:**
   - Verify that SSL settings in Coolify are correctly set up
   - Ensure your domain is properly pointing to your server IP
   - Allow time for DNS changes and certificate issuance to propagate

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

## Backup and Recovery

1. Regularly backup your Supabase database using the Supabase dashboard
2. Configure automated backups for your server
3. Document the recovery process for your deployment

## Security Considerations

1. Set up SSL/TLS for your domain
2. Regularly update dependencies
3. Monitor access logs for suspicious activity
4. Consider implementing rate limiting for application forms

For any additional help or questions, please refer to the [Coolify documentation](https://coolify.io/docs) or the [Supabase documentation](https://supabase.com/docs).
