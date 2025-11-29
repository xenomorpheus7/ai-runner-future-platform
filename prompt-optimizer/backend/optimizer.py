import os
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq

"""Optimizer module to call GROQ Llama for prompt transformations.
This module expects a `GROQ_API_KEY` environment variable to be set.
"""

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set. Please add it to your .env file or set it in the environment.")

client = Groq(api_key=GROQ_API_KEY)

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
