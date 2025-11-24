import emailjs from '@emailjs/browser';

// EmailJS configuration
// These should be set in your .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Recipient email (default for all forms)
const RECIPIENT_EMAIL = 'robert@airunner2033.com';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SchoolFormData {
  schoolName: string;
  contactPerson: string;
  email: string;
  phone: string;
  preferredDate?: string;
  studentAge?: string;
  notes?: string;
}

export interface InterestSurveyData {
  email: string;
  selectedInterests: string[];
}

/**
 * Send contact form email
 */
export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS is not configured. Please add EmailJS credentials to your .env file.');
      return false;
    }

    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      reply_to: data.email,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Error sending contact email:', error);
    return false;
  }
};

/**
 * Send school workshop booking email
 */
export const sendSchoolBookingEmail = async (data: SchoolFormData): Promise<boolean> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS is not configured. Please add EmailJS credentials to your .env file.');
      return false;
    }

    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_name: data.contactPerson,
      from_email: data.email,
      subject: `School Workshop Booking - ${data.schoolName}`,
      message: `
School Name: ${data.schoolName}
Contact Person: ${data.contactPerson}
Email: ${data.email}
Phone: ${data.phone}
Preferred Date: ${data.preferredDate || 'Not specified'}
Student Age: ${data.studentAge || 'Not specified'}

Additional Notes:
${data.notes || 'None'}
      `.trim(),
      reply_to: data.email,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Error sending school booking email:', error);
    return false;
  }
};

/**
 * Send interest survey email
 */
export const sendInterestSurveyEmail = async (data: InterestSurveyData): Promise<boolean> => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS is not configured. Please add EmailJS credentials to your .env file.');
      return false;
    }

    const templateParams = {
      to_email: RECIPIENT_EMAIL,
      from_email: data.email,
      subject: 'AI Runner 2033 - Interest Survey Submission',
      message: `
Email: ${data.email}

Selected Interests:
${data.selectedInterests.map(interest => `- ${interest}`).join('\n')}
      `.trim(),
      reply_to: data.email,
    };

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Error sending interest survey email:', error);
    return false;
  }
};

