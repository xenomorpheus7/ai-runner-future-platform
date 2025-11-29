import axios from "axios";

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;

// SHARED BREVO CONFIG
const brevo = axios.create({
  baseURL: "https://api.brevo.com/v3/smtp",
  headers: {
    "accept": "application/json",
    "content-type": "application/json",
    "api-key": BREVO_API_KEY
  }
});

// -------------------------------------------------------
// 1. CONTACT FORM EMAIL
// -------------------------------------------------------
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email: "robert@airunner2033.com" }],
      subject: `📩 New Contact Form Submission: ${formData.subject || "No Subject"}`,
      htmlContent: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${formData.name}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Message:</b> ${formData.message}</p>
      `
    });

    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email: formData.email }],
      subject: "Thank you for your message!",
      htmlContent: `
        <h1>🚀 Thank you for reaching out!</h1>
        <p>Hi ${formData.name},</p>
        <p>Your message is received — I’ll reply shortly.</p>
        <p>— Robert</p>
      `
    });

    return true;
  } catch (error) {
    console.error("Brevo Contact Error:", error);
    return false;
  }
};


// -------------------------------------------------------
// 2. POPUP / SURVEY EMAIL
// -------------------------------------------------------
export const sendPopupEmail = async (email: string, message: string) => {
  try {
    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email: "robert@airunner2033.com" }],
      subject: "📢 New Popup Form Submission",
      htmlContent: `
        <h2>New Popup Submission</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email }],
      subject: "Thank you for your submission!",
      htmlContent: `
        <h1>🙏 Thanks!</h1>
        <p>I received your popup message.</p>
        <p>— Robert</p>
      `
    });

    return true;
  } catch (error) {
    console.error("Brevo Popup Error:", error);
    return false;
  }
};


// -------------------------------------------------------
// 3. SCHOOLS EMAIL (big form)
// -------------------------------------------------------
export const sendSchoolsEmail = async (formData: {
  schoolName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  message?: string;
}) => {
  try {
    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email: "robert@airunner2033.com" }],
      subject: `🏫 New School Inquiry from ${formData.schoolName}`,
      htmlContent: `
        <h2>New School Inquiry</h2>
        <p><b>School:</b> ${formData.schoolName}</p>
        <p><b>Contact Person:</b> ${formData.contactPerson}</p>
        <p><b>Email:</b> ${formData.email}</p>
        <p><b>Phone:</b> ${formData.phone}</p>
        <p><b>Message:</b> ${formData.message || "No message"}</p>
      `
    });

    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email: formData.email }],
      subject: "Thank you for your inquiry!",
      htmlContent: `
        <h1>📘 Thank you!</h1>
        <p>Hello ${formData.contactPerson},</p>
        <p>Your school has been registered for workshop interest.</p>
        <p>I’ll contact you shortly.</p>
        <p>— Robert</p>
      `
    });

    return true;
  } catch (error) {
    console.error("Brevo School Error:", error);
    return false;
  }
};


// -------------------------------------------------------
// 4. WELCOME EMAIL (Google OAuth / Register)
// -------------------------------------------------------
export const sendWelcomeEmail = async (email: string) => {
  try {
    await brevo.post("/email", {
      sender: { email: "robert@airunner2033.com", name: "AI Runner 2033" },
      to: [{ email }],
      subject: "Welcome to AI Runner 2033 🚀",
      htmlContent: `
        <h1>🎉 Welcome aboard!</h1>
        <p>Your account was successfully created using Google Sign-In.</p>
        <p>Get ready to explore the future of AI learning and tools.</p>
        <br/>
        <p>— Robert from AI Runner 2033</p>
      `
    });

    return true;
  } catch (error) {
    console.error("Brevo Welcome Email Error:", error);
    return false;
  }
};
