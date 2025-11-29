import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

"""Optimizer module to call GROQ Llama for prompt transformations.
This module expects a `GROQ_API_KEY` environment variable to be set.
"""

load_dotenv()

# Read the key but DO NOT raise at import time. Some deploy environments
# may not set the GROQ_API_KEY and we don't want the whole process to crash
# during module import. The client will be lazily initialized when needed.
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = None

def get_groq_client():
    """Lazily initialize and return a Groq client or None if key missing."""
    global client
    if client is not None:
        return client
    key = GROQ_API_KEY or os.getenv("GROQ_API_KEY")
    if not key:
        return None
    client = Groq(api_key=key)
    return client

def load_template(model):
    """Load optimization template for a specific model"""
    # Get the directory where this script is located
    backend_dir = Path(__file__).parent
    template_path = backend_dir / "templates" / f"{model}.txt"
    
    if not template_path.exists():
        raise ValueError(f"Template not found for model: {model} at {template_path}")
    return template_path.read_text()

async def optimize_prompt(raw_prompt, model):
    """Optimize a prompt for a specific AI model using GROQ"""
    template = load_template(model)

    messages = [
        {"role": "system", "content": template},
        {"role": "user", "content": raw_prompt}
    ]

    client = get_groq_client()
    if not client:
        raise Exception("GROQ_API_KEY is not configured; cannot optimize prompts.")

    try:
        # GROQ SDK FORMAT - response is an object, access .content attribute
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.3,
        )

        # Access content as attribute, not dictionary key
        optimized_content = response.choices[0].message.content

        if not optimized_content:
            raise ValueError("Empty response from GROQ API")

        return optimized_content

    except Exception as e:
        raise Exception(f"Failed to optimize prompt with GROQ: {str(e)}")
