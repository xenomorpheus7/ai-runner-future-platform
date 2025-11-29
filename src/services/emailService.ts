import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-runner-future-platform-production.up.railway.app",
  headers: { "Content-Type": "application/json" }
});

// Helper to send email through backend
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await API.post("/send-email", {
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error("Backend Email Error:", error);
    return false;
  }
};

// -------------------------------------------------------
// 1. CONTACT FORM EMAIL  (admin + user confirmation)
// -------------------------------------------------------
export const sendContactEmail = async (formData: any) => {
  // Send to Robert
  await sendEmail(
    "robert@airunner2033.com",
    `📩 New Contact Form Submission: ${formData.subject || "No Subject"}`,
    `
    <h2>New Contact Message</h2>
    <p><b>Name:</b> ${formData.name}</p>
    <p><b>Email:</b> ${formData.email}</p>
    <p><b>Message:</b> ${formData.message}</p>
    `
  );

  // Confirmation to user
  return sendEmail(
    formData.email,
    "Thank you for your message!",
    `
    <h1>🚀 Thank you for reaching out!</h1>
    <p>Hi ${formData.name},</p>
    <p>Your message is received — I’ll reply shortly.</p>
    <p>— Robert</p>
    `
  );
};

// -------------------------------------------------------
// 2. POPUP / SURVEY EMAIL (admin + user confirmation)
// -------------------------------------------------------
export const sendPopupEmail = async (email: string, message: string) => {
  // Send to Robert
  await sendEmail(
    "robert@airunner2033.com",
    "📢 New Popup Form Submission",
    `
    <h2>New Popup Submission</h2>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b></p>
    <p>${message}</p>
    `
  );

  // Confirmation to user
  return sendEmail(
    email,
    "Thank you for your submission!",
    `
    <h1>🙏 Thanks!</h1>
    <p>I received your popup message.</p>
    <p>— Robert</p>
    `
  );
};

// -------------------------------------------------------
// 3. SCHOOLS EMAIL (admin + user)
// -------------------------------------------------------
export const sendSchoolsEmail = async (formData: any) => {
  // Send to Robert
  await sendEmail(
    "robert@airunner2033.com",
    `🏫 New School Inquiry from ${formData.schoolName}`,
    `
    <h2>New School Inquiry</h2>
    <p><b>School:</b> ${formData.schoolName}</p>
    <p><b>Contact Person:</b> ${formData.contactPerson}</p>
    <p><b>Email:</b> ${formData.email}</p>
    <p><b>Phone:</b> ${formData.phone}</p>
    <p><b>Message:</b> ${formData.message || "No message"}</p>
    `
  );

  // Confirmation to school
  return sendEmail(
    formData.email,
    "Thank you for your inquiry!",
    `
    <h1>📘 Thank you!</h1>
    <p>Hello ${formData.contactPerson},</p>
    <p>Your school has been registered for workshop interest.</p>
    <p>I’ll contact you shortly.</p>
    <p>— Robert</p>
    `
  );
};

// -------------------------------------------------------
// 4. WELCOME EMAIL (user only)
// -------------------------------------------------------
export const sendWelcomeEmail = (email: string) => {
  return sendEmail(
    email,
    "Welcome to AI Runner 2033 🚀",
    `
    <h1>🎉 Welcome aboard!</h1>
    <p>Your account was successfully created using Google Sign-In.</p>
    <p>— Robert from AI Runner 2033</p>
    `
  );
};
