# EmailJS Setup Guide

This guide will help you set up EmailJS to enable direct email sending from all forms on your website.

## What is EmailJS?

EmailJS allows you to send emails directly from your frontend application without a backend server. All form submissions (Contact, Schools, Interest Survey) will be sent directly to `robert@airunner2033.com`.

## Setup Steps

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

### 2. Create an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps for your provider
5. Note your **Service ID** (e.g., `service_xxxxxxx`)

### 3. Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template structure:

**Template Name:** `contact_form` (or any name you prefer)

**Subject:**
```
{{subject}}
```

**Content:**
```
From: {{from_name}} ({{from_email}})
Reply-To: {{reply_to}}

Subject: {{subject}}

Message:
{{message}}
```

4. In the **Settings** tab:
   - Set **To Email** to: `robert@airunner2033.com`
   - Set **From Name** to: `{{from_name}}`
   - Set **Reply To** to: `{{reply_to}}`

5. Note your **Template ID** (e.g., `template_xxxxxxx`)

### 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)
3. Copy this key

### 5. Add Environment Variables

1. Create or edit your `.env` file in the root of your project
2. Add the following variables:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

### 6. Restart Your Development Server

After adding the environment variables, restart your development server:

```bash
npm run dev
```

## Testing

1. Fill out the Contact form on your website
2. Submit the form
3. Check your email at `robert@airunner2033.com`
4. You should receive the email directly without any email client opening

## Forms Configured

The following forms are now configured to send emails directly:

1. **Contact Form** (`/contact`)
   - Sends: Name, Email, Subject, Message

2. **Schools Workshop Booking Form** (`/schools`)
   - Sends: School Name, Contact Person, Email, Phone, Preferred Date, Student Age, Notes

3. **Interest Survey Popup**
   - Sends: Email, Selected Interests

All emails are sent to: **robert@airunner2033.com**

## Troubleshooting

### Emails not sending?

1. Check that all environment variables are set correctly
2. Verify your EmailJS service is connected and active
3. Check the browser console for any error messages
4. Ensure your EmailJS account hasn't exceeded the free tier limit (200 emails/month)

### Need more emails?

EmailJS offers paid plans with higher limits:
- Free: 200 emails/month
- Paid plans start at $15/month for 1,000 emails

## Security Notes

- The Public Key is safe to expose in frontend code
- EmailJS handles email sending securely
- All form data is sent directly to your email without storing it

## Support

For EmailJS support, visit: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)

