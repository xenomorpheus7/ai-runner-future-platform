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

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AI Runner 2033 Prompt Optimizer",
    description="Optimize prompts for different AI models using GROQ Llama 3.1 8B",
    version="1.0.0"
)

# Configure CORS - Allow requests from localhost, brainybear.ai, and airunner2033.com
# Note: Order matters - CORS middleware must be added before route handlers
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:8080",  # Frontend dev server port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8080",
    "https://brainybear.ai",
    "https://www.brainybear.ai",
    "https://airunner2033.com",
    "https://www.airunner2033.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    expose_headers=["*"],
    max_age=3600,  # Cache preflight requests for 1 hour
)

# Supported models list
SUPPORTED_MODELS = ["chatgpt", "cursor", "midjourney", "leonardo", "sora", "veo"]


# Request model for validation
class OptimizeRequest(BaseModel):
    """Request model for prompt optimization"""
    model: str
    prompt: str


# Response model
class OptimizeResponse(BaseModel):
    """Response model for optimized prompt"""
    optimized_prompt: str


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "AI Runner 2033 Prompt Optimizer",
        "supported_models": SUPPORTED_MODELS
    }


@app.post("/optimize", response_model=OptimizeResponse)
async def optimize(request: OptimizeRequest):
    """
    Optimize a prompt for a specific AI model
    
    Args:
        request: OptimizeRequest containing model and prompt
        
    Returns:
        OptimizeResponse with optimized prompt
        
    Raises:
        HTTPException: If model is not supported or optimization fails
    """
    # Validate model
    if request.model.lower() not in SUPPORTED_MODELS:
        raise HTTPException(
            status_code=400,
            detail=f"Model '{request.model}' is not supported. Supported models: {', '.join(SUPPORTED_MODELS)}"
        )
    
    # Validate prompt is not empty
    if not request.prompt or not request.prompt.strip():
        raise HTTPException(
            status_code=400,
            detail="Prompt cannot be empty"
        )
    
    try:
        # Optimize the prompt using the optimizer module
        optimized = await optimize_prompt(request.prompt, request.model.lower())
        
        return OptimizeResponse(optimized_prompt=optimized)
    
    except Exception as e:
        # Log the error and return a user-friendly message
        raise HTTPException(
            status_code=500,
            detail=f"Failed to optimize prompt: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

