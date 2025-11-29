"""
FastAPI backend for AI Runner 2033 Prompt Optimizer
Handles prompt optimization requests and routes them to GROQ Llama 3.1 8B
"""

from fastapi import FastAPI, HTTPException, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from optimizer import optimize_prompt
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

# ---------------------------------------------------------
# CORS configuration
# ---------------------------------------------------------
ALLOWED_ORIGINS = [
    "https://airunner2033.com",
    "https://www.airunner2033.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
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
    if origin and origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
        response.headers["Access-Control-Allow-Credentials"] = "true"

    return response

# ---------------------------------------------------------
# Supported models
# ---------------------------------------------------------
SUPPORTED_MODELS = ["chatgpt", "cursor", "midjourney", "leonardo", "sora", "veo"]

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
    if origin and origin in ALLOWED_ORIGINS:
        headers["Access-Control-Allow-Origin"] = origin
        headers["Vary"] = "Origin"
        headers["Access-Control-Allow-Methods"] = ",".join(["*"])
        headers["Access-Control-Allow-Headers"] = ",".join(["*"])
        headers["Access-Control-Allow-Credentials"] = "true"
    return Response(status_code=204, headers=headers)

# ---------------------------------------------------------
# Run locally
# ---------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
