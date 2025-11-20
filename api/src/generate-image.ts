export default {
  async fetch(request: Request): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    try {
      // Get the request body
      const body = await request.json();
      const { prompt, negativePrompt, guidanceScale, numInferenceSteps, width, height } = body;

      // Validate required fields
      if (!prompt) {
        return new Response(JSON.stringify({ error: "Prompt is required" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Get Hugging Face token from environment
      const HF_TOKEN = process.env.HF_TOKEN || request.headers.get("X-HF-Token");

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

      // Call Hugging Face API
      const hfResponse = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
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
      const imageBlob = await hfResponse.blob();

      // Check if it's actually an image
      if (!imageBlob.type.startsWith("image/")) {
        const text = await imageBlob.text();
        try {
          const json = JSON.parse(text);
          return new Response(JSON.stringify({ error: json.error || "Failed to generate image" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch {
          return new Response(JSON.stringify({ error: "Unexpected response format" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      }

      // Return the image with proper CORS headers
      return new Response(imageBlob, {
        status: 200,
        headers: {
          "Content-Type": imageBlob.type,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    } catch (error: any) {
      console.error("Proxy error:", error);
      return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};

