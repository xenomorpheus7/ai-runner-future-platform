import axios from "axios";

// Contact forms use Railway backend (already has Brevo working)
// Use a Vite env variable for the backend base URL so it can be changed
// without code changes when redeploying or moving the service.
const RAILWAY_BASE_URL =
  import.meta.env.VITE_RAILWAY_API_URL

const railwayAPI = axios.create({
  baseURL: RAILWAY_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// Serverless functions (for welcome email during registration)
const serverlessAPI = axios.create({
  headers: { "Content-Type": "application/json" }
});

// Helper to send email through Railway backend (for contact forms)
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const res = await railwayAPI.post("/send-email", {
      to,
      subject,
      html
    });
    // Backend returns { success: true } or { success: false, error: ... }
    if (res && res.data && res.data.success === false) {
      console.warn("Backend responded with error:", res.data);
      // Do not block the UI flow on soft backend errors; treat as best-effort.
    }
    return true;
  } catch (error) {
    // Try to extract backend error message
    const err = error as any;
    const backendMsg = err?.response?.data || err?.message || err;
    console.error("Backend Email Error:", backendMsg);
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
// 4. WELCOME EMAIL (user only - uses serverless function)
// -------------------------------------------------------
export const sendWelcomeEmail = async (email: string) => {
  try {
    const res = await serverlessAPI.post("/sendWelcomeEmail", {
      email
    });
    if (res && res.data && res.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Welcome email error:", error);
    return false;
  }
};
