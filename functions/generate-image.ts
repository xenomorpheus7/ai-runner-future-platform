// Cloudflare Pages Function to proxy Hugging Face API requests
// This handles CORS and forwards requests to Hugging Face

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-HF-Token",
    },
  });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try {
    const body = await request.json();
    const { 
      prompt, 
      negativePrompt, 
      guidanceScale, 
      numInferenceSteps, 
      width, 
      height 
    } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Get Hugging Face token from environment or request header
    const HF_TOKEN = env.HF_TOKEN || request.headers.get("X-HF-Token");

    if (!HF_TOKEN) {
      return new Response(JSON.stringify({ error: "Hugging Face token not configured" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Build the full prompt
    const fullPrompt = negativePrompt 
      ? `${prompt}. Negative prompt: ${negativePrompt}`
      : prompt;

    // Call Hugging Face API (new endpoint)
    const hfResponse = await fetch(
      "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            num_inference_steps: numInferenceSteps || 20,
            guidance_scale: guidanceScale || 7.5,
            width: width || 1024,
            height: height || 1024,
          },
        }),
      }
    );

    // Handle different response statuses
    if (hfResponse.status === 503) {
      return new Response(JSON.stringify({ error: "Model is loading. Please wait a moment and try again." }), {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (!hfResponse.ok) {
      const errorData = await hfResponse.json().catch(() => ({}));
      return new Response(JSON.stringify({ 
        error: errorData.error || `API error: ${hfResponse.statusText}`,
        status: hfResponse.status 
      }), {
        status: hfResponse.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Get the image blob
    const imageBlob = await hfResponse.arrayBuffer();

    // Check content type
    const contentType = hfResponse.headers.get("content-type") || "image/png";

    // Return the image with proper CORS headers
    return new Response(imageBlob, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-HF-Token",
      },
    });
  } catch (e: any) {
    console.error("Proxy error:", e);
    return new Response(JSON.stringify({ error: e?.message || "Proxy failure" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

