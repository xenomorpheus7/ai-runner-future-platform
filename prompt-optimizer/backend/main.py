"""
FastAPI backend for AI Runner 2033 Prompt Optimizer
Handles prompt optimization requests and routes them to GROQ Llama 3.1 8B
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from optimizer import optimize_prompt
import os
from dotenv import load_dotenv
import httpx  # required for Brevo emails

# ---------------------------------------------------------
# Load environment variables
# ---------------------------------------------------------
load_dotenv()

# BREVO email configuration
BREVO_API_KEY = os.getenv("BREVO_API_KEY")
BREVO_BASE_URL = "https://api.brevo.com/v3/smtp"

# ---------------------------------------------------------
# Initialize FastAPI app
# ---------------------------------------------------------
app = FastAPI(
    title="AI Runner 2033 Prompt Optimizer",
    description="Optimize prompts & handle email sending via GROQ + Brevo",
    version="1.1.0"
)

# ---------------------------------------------------------
# CORS configuration
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    # Validate model name
    if request.model.lower() not in SUPPORTED_MODELS:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Model '{request.model}' is not supported. "
                f"Supported models: {', '.join(SUPPORTED_MODELS)}"
            )
        )

    # Validate prompt
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
async def send_email(payload: dict):
    """
    Generic email endpoint for Brevo.
    Frontend sends:
    {
        "to": "someone@gmail.com",
        "subject": "text",
        "html": "<p>Hello</p>"
    }
    """

    if not BREVO_API_KEY:
        raise HTTPException(status_code=500, detail="Missing BREVO_API_KEY")

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
                    "to": [{"email": payload["to"]}],
                    "subject": payload["subject"],
                    "htmlContent": payload["html"]
                }
            )

        if response.status_code >= 400:
            raise HTTPException(
                status_code=response.status_code,
                detail=response.text
            )

        return {"success": True}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email failed: {str(e)}")


# ---------------------------------------------------------
# Run locally
# ---------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
