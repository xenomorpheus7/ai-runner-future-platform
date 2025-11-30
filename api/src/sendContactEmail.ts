import type { PagesFunction } from "@cloudflare/workers-types";

const BREVO_BASE_URL = "https://api.brevo.com/v3/smtp";

// Configure your defaults here
const SUPPORT_EMAIL = "robert@airunner2033.com";
const SUPPORT_NAME = "AI Runner 2033";

// Cloudflare Pages Function for sending contact/form emails via Brevo
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    // Get Brevo API key from environment (Cloudflare Pages) or request header (local dev)
    const apiKey = (env as any)?.BREVO_API_KEY ||
      (env as any)?.VITE_BREVO_API_KEY ||
      request.headers.get("X-Brevo-Api-Key") ||
      request.headers.get("X-BREVO-API-KEY");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "BREVO_API_KEY is not configured" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, html",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Send email via Brevo SMTP API
    const brevoResponse = await fetch(`${BREVO_BASE_URL}/email`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SUPPORT_NAME, email: SUPPORT_EMAIL },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text().catch(() => "");
      console.error("Brevo error:", brevoResponse.status, errorText);

      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          status: brevoResponse.status,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("sendContactEmail error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
