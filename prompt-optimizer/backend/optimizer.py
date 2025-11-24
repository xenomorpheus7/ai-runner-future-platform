"""
Prompt optimizer module
Handles template loading and GROQ API integration for prompt optimization
"""

import os
import asyncio
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize GROQ client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in environment variables")

client = Groq(api_key=GROQ_API_KEY)

# Model to use for optimization
GROQ_MODEL = "llama-3.1-8b-instant"

# Get the directory where this file is located
BASE_DIR = Path(__file__).parent
TEMPLATES_DIR = BASE_DIR / "templates"


def load_template(model: str) -> str:
    """
    Load the template file for a specific model
    
    Args:
        model: The target model name (e.g., "chatgpt", "midjourney")
        
    Returns:
        The template content as a string
        
    Raises:
        FileNotFoundError: If template file doesn't exist
    """
    template_path = TEMPLATES_DIR / f"{model}.txt"
    
    if not template_path.exists():
        raise FileNotFoundError(f"Template not found for model: {model}")
    
    with open(template_path, "r", encoding="utf-8") as f:
        return f.read().strip()


def build_prompt(raw_prompt: str, model: str) -> str:
    """
    Build the full prompt by combining template with user's raw prompt
    
    Args:
        raw_prompt: The user's original prompt
        model: The target model name
        
    Returns:
        The complete prompt ready to send to GROQ
    """
    template = load_template(model)
    
    # Combine template with user prompt
    full_prompt = f"{template}\n\nUSER PROMPT:\n{raw_prompt}"
    
    return full_prompt


async def optimize_prompt(raw_prompt: str, model: str) -> str:
    """
    Optimize a prompt for a specific AI model using GROQ Llama 3.1 8B
    
    Args:
        raw_prompt: The user's original prompt to optimize
        model: The target model name (e.g., "chatgpt", "midjourney")
        
    Returns:
        The optimized prompt text (cleaned output from GROQ)
        
    Raises:
        Exception: If optimization fails
    """
    # Build the full prompt with template
    full_prompt = build_prompt(raw_prompt, model)
    
    try:
        # Send request to GROQ API (run in thread pool to avoid blocking)
        def call_groq():
            return client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": full_prompt
                    }
                ],
                model=GROQ_MODEL,
                temperature=0.7,
                max_tokens=2000,
            )
        
        # Run the synchronous GROQ call in a thread pool
        chat_completion = await asyncio.to_thread(call_groq)
        
        # Extract the response text
        optimized_text = chat_completion.choices[0].message.content
        
        # Clean and return the optimized prompt
        # Remove any markdown code blocks if present
        if optimized_text.startswith("```"):
            # Remove markdown code block markers
            lines = optimized_text.split("\n")
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines[-1].strip() == "```":
                lines = lines[:-1]
            optimized_text = "\n".join(lines)
        
        return optimized_text.strip()
    
    except Exception as e:
        raise Exception(f"GROQ API error: {str(e)}")

