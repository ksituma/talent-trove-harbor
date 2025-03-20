
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
5. Execute the SQL commands from the `setup-admin-user.sql` file to create the admin user
6. Make note of your Supabase project URL and anon key (found in Project Settings > API)

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

## Step 11: Configure Admin Access

For the admin login to work properly:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Make sure there's a user with email "admin@ksg.ac.ke" 
4. If not, create a new user with:
   - Email: admin@ksg.ac.ke
   - Password: admin123
5. If needed, you can use SQL to create this user:
   ```sql
   -- Run this in Supabase SQL Editor
   INSERT INTO auth.users (
     instance_id, id, aud, role, email, encrypted_password, 
     email_confirmed_at, recovery_sent_at, last_sign_in_at, 
     raw_app_meta_data, raw_user_meta_data, created_at, updated_at
   ) 
   VALUES (
     '00000000-0000-0000-0000-000000000000', 
     gen_random_uuid(), 
     'authenticated', 
     'authenticated', 
     'admin@ksg.ac.ke', 
     crypt('admin123', gen_salt('bf')), 
     now(), 
     now(), 
     now(), 
     '{"provider":"email","providers":["email"]}', 
     '{}', 
     now(), 
     now()
   )
   ON CONFLICT (email) DO NOTHING;
   ```

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
- **Login issues**: Verify you've created the admin user in Supabase

## Docker Deployment (Alternative)

You can also deploy the application using Docker directly:

1. Create a `Dockerfile` in your project root:
   ```dockerfile
   FROM node:18-alpine AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS deploy
   WORKDIR /app
   COPY --from=build /app/dist ./dist
   COPY --from=build /app/package*.json ./
   RUN npm ci --omit=dev
   EXPOSE 4173
   ENV HOST=0.0.0.0
   ENV PORT=4173
   CMD ["npm", "run", "preview"]
   ```

2. Create a `.dockerignore` file:
   ```
   node_modules
   dist
   .git
   .gitignore
   .env
   ```

3. Build and run the Docker image:
   ```bash
   docker build -t ksg-ats .
   docker run -p 4173:4173 -e VITE_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_ID.supabase.co -e VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY ksg-ats
   ```

4. For production with Docker Compose, create a `docker-compose.yml` file:
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "4173:4173"
       environment:
         - VITE_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_ID.supabase.co
         - VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
       restart: unless-stopped
   ```

5. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

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
