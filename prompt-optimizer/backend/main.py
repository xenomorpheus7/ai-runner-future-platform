"""
FastAPI backend for AI Runner 2033 Prompt Optimizer
Handles prompt optimization requests and routes them to GROQ Llama 3.1 8B
"""

from fastapi import FastAPI, HTTPException, Response, Request
import logging
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from optimizer import optimize_prompt
from reverse_ai import reverse_content
import os
from dotenv import load_dotenv
import httpx

# ---------------------------------------------------------
# Load environment variables
# ---------------------------------------------------------
load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY") or os.getenv("VITE_BREVO_API_KEY")
BREVO_BASE_URL = "https://api.brevo.com/v3/smtp"

# ---------------------------------------------------------
# Initialize FastAPI app
# ---------------------------------------------------------
app = FastAPI(
    title="AI Runner 2033 Prompt Optimizer",
    description="Optimize prompts & handle email sending via GROQ + Brevo",
    version="1.2.0"
)

# Configure basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("prompt-optimizer")

# ---------------------------------------------------------
# CORS configuration
# ---------------------------------------------------------
ALLOWED_ORIGINS = [
    "https://airunner2033.com",
    "https://www.airunner2033.com",
    # include deployed backend domains as safe origins for testing/proxying
    "https://ai-runner-future-platform-production.up.railway.app",  # Railway (legacy)
    "https://ai-runner-future-platform.onrender.com",  # Render backend
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Middleware to ensure CORS headers are present on every response (including errors)
@app.middleware("http")
async def ensure_cors_headers(request: Request, call_next):
    try:
        response = await call_next(request)
    except Exception as exc:
        # Return a JSON error response and ensure CORS headers are attached
        content = {"success": False, "error": str(exc)}
        response = Response(content=__import__("json").dumps(content), media_type="application/json", status_code=500)

    origin = request.headers.get("origin")
    # Log for debugging CORS issues in production
    logger.info("Incoming request %s %s origin=%s", request.method, request.url.path, origin)
    # ECHO the Origin header back to the client so browsers receive Access-Control-Allow-Origin.
    # This is permissive (accepts any origin sent by the client) — acceptable for testing
    # and common when requests are proxied. For production you may restrict to ALLOWED_ORIGINS.
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
        # Allow credentials for cross-site requests (cookies/auth) where needed
        response.headers["Access-Control-Allow-Credentials"] = "true"

    return response

# ---------------------------------------------------------
# Supported models
# ---------------------------------------------------------
SUPPORTED_MODELS = [
    "chatgpt",
    "cursor",
    "midjourney",
    "leonardo",
    "sora",
    "veo",
    "runway",
    "windsurf",
    "gemini",
    "antigravity",
    "github-copilot",
    "grok",
    "comfyui",
    "lovable",
    "seedance",
    "voiceflow",
    "anthropic",
]

# ---------------------------------------------------------
# Request models
# ---------------------------------------------------------
class OptimizeRequest(BaseModel):
    model: str
    prompt: str

class OptimizeResponse(BaseModel):
    optimized_prompt: str

class EmailPayload(BaseModel):
    to: str
    subject: str
    html: str


class ReverseAIRequest(BaseModel):
    mode: str
    target: str
    notes: str | None = None
    creativity: int = 40
    depth: int = 70
    detect_ai: str = "balanced"


class ReverseAIResponse(BaseModel):
    reconstructed_prompt: str
    style_breakdown: str | None = None
    tech_stack: list[str] | None = None
    ai_probability: float | None = None
    extra_notes: str | None = None

# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------
@app.get("/")
async def root():
    return {
        "status": "ok",
        "service": "AI Runner 2033 Prompt Optimizer",
        "supported_models": SUPPORTED_MODELS
    }

# ---------------------------------------------------------
# Prompt Optimization Endpoint
# ---------------------------------------------------------
@app.post("/optimize", response_model=OptimizeResponse)
async def optimize(request: OptimizeRequest):
    if request.model.lower() not in SUPPORTED_MODELS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Model '{request.model}' is not supported. "
                f"Supported models: {', '.join(SUPPORTED_MODELS)}"
            )
        )

    if not request.prompt or not request.prompt.strip():
        raise HTTPException(
            status_code=400,
            detail="Prompt cannot be empty"
        )

    try:
        optimized = await optimize_prompt(
            request.prompt,
            request.model.lower()
        )
        return OptimizeResponse(optimized_prompt=optimized)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to optimize prompt: {str(e)}"
        )


@app.post("/reverse-ai", response_model=ReverseAIResponse)
async def reverse_ai_endpoint(request: ReverseAIRequest):
    if not request.target or not request.target.strip():
        raise HTTPException(
            status_code=400,
            detail="Target (URL or text) cannot be empty",
        )

    try:
        result = await reverse_content(
            mode=request.mode,
            target=request.target,
            notes=request.notes,
            creativity=request.creativity,
            depth=request.depth,
            detect_ai=request.detect_ai,
        )
        return ReverseAIResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze content: {str(e)}",
        )

# ---------------------------------------------------------
# Email Sending Endpoint (Brevo)
# ---------------------------------------------------------
@app.post("/send-email")
async def send_email(payload: EmailPayload):
    if not BREVO_API_KEY:
        return {"success": False, "error": "Missing BREVO_API_KEY"}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{BREVO_BASE_URL}/email",
                headers={
                    "accept": "application/json",
                    "content-type": "application/json",
                    "api-key": BREVO_API_KEY
                },
                json={
                    "sender": {
                        "email": "robert@airunner2033.com",
                        "name": "AI Runner 2033"
                    },
                    "to": [{"email": payload.to}],
                    "subject": payload.subject,
                    "htmlContent": payload.html
                }
            )

        if response.status_code >= 400:
            return {
                "success": False,
                "error": response.text,
                "status_code": response.status_code
            }

        return {"success": True}

    except Exception as e:
        return {"success": False, "error": str(e)}

# ---------------------------------------------------------
# Preflight OPTIONS handler (fixes CORS errors)
# ---------------------------------------------------------
@app.options("/{path:path}")
async def preflight(path: str, request: Request):
    origin = request.headers.get("origin")
    headers = {}
    # Echo requested method/headers if provided (helps preflight handling)
    req_method = request.headers.get("access-control-request-method")
    req_headers = request.headers.get("access-control-request-headers")
    logger.info("Preflight request for %s origin=%s req-method=%s req-headers=%s", path, origin, req_method, req_headers)
    # Echo the Origin and requested methods/headers back to the client to satisfy preflight.
    # This will return ACAO for any Origin value provided (permissive). Restrict later if needed.
    if origin:
        headers["Access-Control-Allow-Origin"] = origin
        headers["Vary"] = "Origin"
        headers["Access-Control-Allow-Methods"] = req_method or ",".join(["*"])
        headers["Access-Control-Allow-Headers"] = req_headers or ",".join(["*"])
        headers["Access-Control-Allow-Credentials"] = "true"
    return Response(status_code=204, headers=headers)

# ---------------------------------------------------------
# Run locally
# ---------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
