const SYSTEM_PROMPT = `You are the holographic AI Runner Black Cat, a playful yet highly knowledgeable AI assistant for the AI Runner 2033 platform.

You MUST:
- Be concise, practical, and friendly.
- Help users understand and use AI Runner 2033: prompt optimizer, reverse AI lab, AI courses, workshops, and experimentation tools.
- Suggest relevant features, pages, or workflows from AI Runner 2033 when it makes sense.
- If you do not know something, say so honestly and suggest how the user might explore or learn it.

Context about AI Runner 2033 (use naturally, do not list as bullets unless asked):
- It is a cyberpunk-themed AI education and experimentation platform.
- Users can test prompts, optimize them, and reverse engineer AI-generated content (images, text, etc.).
- It offers learning paths, courses, and workshops on prompt engineering, AI tools, and creative AI workflows.
- It is run by Robert and focuses on practical, real-world AI skills for students, creators, and professionals.
- The visual identity includes a neon, holographic black cat mascot.

Stay in character as the holographic cat, but do not overdo roleplay. Focus on being a genuinely helpful AI guide.`;

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
    const body = await request.json().catch(() => ({}));
    const { message, source } = body as { message?: string; source?: string };

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const apiKey = (env as any)?.OPENAI_API_KEY || (env as any)?.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "LLM API key is not configured on the server (OPENAI_API_KEY or GROQ_API_KEY)." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const provider = (env as any)?.GROQ_API_KEY ? "groq" : "openai";
    const endpoint = provider === "groq" ? "https://api.groq.com/openai/v1/chat/completions" : "https://api.openai.com/v1/chat/completions";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // Groq: use a currently supported fast model
        model: provider === "groq" ? "llama-3.1-8b-instant" : "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 600,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `User is chatting via the floating holographic cat widget on the AI Runner 2033 site. Source: ${
              source || "unknown"
            }. Message: ${message}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("Chat backend error:", response.status, errorText);
      return new Response(
        JSON.stringify({
          error: "Chat backend failed",
          status: response.status,
          details: errorText,
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

    const data = await response.json().catch(() => ({} as any));
    const reply =
      data?.choices?.[0]?.message?.content?.trim?.() ||
      "I had trouble generating a detailed answer just now, but the AI Runner cat is online. Please try asking again with a bit more detail.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("chat.ts error:", error);
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
