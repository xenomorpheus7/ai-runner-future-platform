import json
from typing import Any, Dict, List, Optional

from optimizer import get_groq_client


async def reverse_content(
    mode: str,
    target: str,
    notes: Optional[str],
    creativity: int,
    depth: int,
    detect_ai: str,
) -> Dict[str, Any]:
    client = get_groq_client()
    if not client:
        raise Exception("GROQ_API_KEY is not configured; cannot run Reverse AI.")

    system_prompt = (
        "You are an expert AI content forensics analyst. "
        "Given some content (image description, website HTML/URL, video metadata or article text), "
        "you infer how it was most likely created. "
        "Always respond as strict JSON with keys: "
        "reconstructed_prompt (string), style_breakdown (string), tech_stack (array of strings), "
        "ai_probability (number between 0 and 1), extra_notes (string). "
        "Do not include any explanation outside JSON."
    )

    user_instructions = {
        "mode": mode,
        "target": target,
        "notes": notes or "",
        "creativity": creativity,
        "analysis_depth": depth,
        "detect_ai_mode": detect_ai,
    }

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": (
                    "Analyze the provided content and respond only with JSON. "
                    "Here is the analysis request: " + json.dumps(user_instructions)
                ),
            },
        ],
        temperature=max(0.1, min(1.0, creativity / 100.0)),
    )

    content = response.choices[0].message.content or "{}"

    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        data = {
            "reconstructed_prompt": "",
            "style_breakdown": "",
            "tech_stack": [],
            "ai_probability": None,
            "extra_notes": content,
        }

    reconstructed_prompt = str(data.get("reconstructed_prompt", "")).strip()
    style_breakdown = str(data.get("style_breakdown", "")).strip() or None
    tech_stack_raw = data.get("tech_stack")
    if isinstance(tech_stack_raw, list):
        tech_stack: Optional[List[str]] = [str(x) for x in tech_stack_raw]
    else:
        tech_stack = None
    ai_probability_raw = data.get("ai_probability")
    try:
        ai_probability = float(ai_probability_raw) if ai_probability_raw is not None else None
    except (TypeError, ValueError):
        ai_probability = None
    extra_notes_raw = data.get("extra_notes", "")
    extra_notes = str(extra_notes_raw).strip() or None

    return {
        "reconstructed_prompt": reconstructed_prompt,
        "style_breakdown": style_breakdown,
        "tech_stack": tech_stack,
        "ai_probability": ai_probability,
        "extra_notes": extra_notes,
    }
