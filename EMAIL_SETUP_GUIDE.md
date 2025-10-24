# Email System Setup Guide

## Overview
The parish website now includes a mass email system that allows administrators to send bulk emails to subscribers with attachments.

## Prerequisites
- Gmail account for the parish (olfperthamboy@gmail.com)
- 2-Factor Authentication enabled on the Gmail account

## Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to "Security"
3. Under "Signing in to Google," select "2-Step Verification"
4. Follow the prompts to enable 2FA

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select your device (e.g., "Other" and name it "Parish Website")
4. Click "Generate"
5. Google will display a 16-character password (e.g., "xxxx xxxx xxxx xxxx")
6. Copy this password (you won't be able to see it again)

### Step 3: Configure Backend
1. Open `backend/.env` file
2. Add or update these lines:
   ```
   EMAIL_USER=olfperthamboy@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password-here
   ```
3. Remove spaces from the app password
4. Save the file
5. Restart the backend server

## Using the Mass Email System

### Access the Subscriber Manager
1. Log in to the admin dashboard
2. Click on the "Subscribers" tab in the sidebar
3. You'll see a list of all email subscribers

### Send a Mass Email
1. Click "Compose Mass Email" button
2. Fill in the form:
   - **Subject**: Email subject line (required)
   - **Message**: Email content (required)
   - **Language Filter**: Optional - send to English or Spanish subscribers only
   - **Attachment**: Optional - upload an image or PDF (max 10MB)
3. Select recipients:
   - Check individual subscribers, OR
   - Use language filter to target specific language group, OR
   - Leave all unchecked to send to everyone
4. Review recipient count
5. Click "Send Email"

## Features

### Email Template
Emails are sent with a professional HTML template featuring:
- Parish header with name and address
- Your custom message (preserves line breaks)
- Parish contact information in footer
- Unsubscribe notice

### Recipient Privacy
- Uses BCC (Blind Carbon Copy)
- Recipients cannot see other subscriber emails
- Protects member privacy

### Attachments
- Supports: JPG, PNG, GIF, PDF, DOC, DOCX
- Maximum size: 10MB
- Perfect for flyers, announcements, newsletters

### Filtering Options
- **All Subscribers**: Send to everyone
- **English Only**: Target English-speaking members
- **Spanish Only**: Target Spanish-speaking members  
- **Selected**: Choose specific subscribers

## Troubleshooting

### "Email service not configured" Error
- Verify EMAIL_USER and EMAIL_PASSWORD are set in .env
- Check that app password has no spaces
- Restart the backend server after changing .env

### "Invalid login" Error
- App password may be incorrect
- Generate a new app password
- Make sure 2FA is enabled

### Emails Not Sending
- Check Gmail account hasn't reached sending limits
- Verify subscriber emails are valid
- Check backend logs for detailed error messages

## Security Notes

1. **Never commit .env file to Git**
   - It's already in .gitignore
   - Keep email credentials private

2. **App Password Security**
   - Treat app passwords like regular passwords
   - Never share them
   - Revoke unused app passwords

3. **Subscriber Privacy**
   - BCC protects recipient identities
   - Don't export subscriber list publicly
   - Follow email privacy regulations

## Gmail Sending Limits

- **Individual Gmail**: ~500 emails per day
- **Google Workspace**: ~2,000 emails per day
- Space out large campaigns if needed
- Consider upgrading to Google Workspace for higher limits

## Support

For technical issues:
- Check backend console logs for errors
- Verify .env configuration
- Test with a small group first
- Contact system administrator if problems persist

