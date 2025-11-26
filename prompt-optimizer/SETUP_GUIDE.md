# Prompt Optimizer Setup Guide

This guide will help you set up the Prompt Optimizer backend so it works properly with Groq.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- A Groq API key (get one at https://console.groq.com/)

## Step-by-Step Setup

### 1. Install Python Dependencies

Navigate to the backend directory and install the required packages:

```bash
cd prompt-optimizer/backend
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- Groq SDK (Python client for Groq API)
- python-dotenv (environment variable management)

### 2. Set Up Environment Variables

Create a `.env` file in the `prompt-optimizer/backend/` directory:

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Linux/Mac
touch .env
```

Add your Groq API key to the `.env` file:

```
GROQ_API_KEY=your-groq-api-key-here
```

**Important:** Replace `your-groq-api-key-here` with your actual Groq API key from https://console.groq.com/

### 3. Verify Template Files

Make sure all template files exist in `prompt-optimizer/backend/templates/`:
- ✅ chatgpt.txt
- ✅ cursor.txt
- ✅ midjourney.txt
- ✅ leonardo.txt
- ✅ sora.txt
- ✅ veo.txt

### 4. Start the Backend Server

From the `prompt-optimizer/backend/` directory, run:

```bash
# Development mode (with auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start on `http://localhost:8000`

### 5. Test the Backend

Open a new terminal and test the API:

```bash
# Test with curl
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d "{\"prompt\":\"a beautiful sunset\",\"model\":\"midjourney\"}"
```

You should receive a JSON response with an `optimized_prompt` field.

### 6. Verify Frontend Connection

The frontend is configured to connect to the backend at `http://localhost:8000` by default. This is set via the environment variable `VITE_PROMPT_OPTIMIZER_API`.

To verify or change this, check:
- `.env` file in the project root
- `src/pages/PromptOptimizer.tsx` (line 14)

## How It Works

1. **User enters a prompt** in the frontend
2. **User selects a target model** (ChatGPT, Cursor, Midjourney, etc.)
3. **Frontend sends request** to `http://localhost:8000/optimize`
4. **Backend loads template** for the selected model
5. **Backend sends to Groq** using Llama 3.1 8B Instant
6. **Groq optimizes the prompt** based on the model-specific template
7. **Optimized prompt** is returned to the frontend
8. **User sees the result** in the "Optimized Prompt" section

## Troubleshooting

### Error: "GROQ_API_KEY environment variable is not set"

**Solution:** Make sure you created a `.env` file in `prompt-optimizer/backend/` with your Groq API key.

### Error: "Template not found for model: X"

**Solution:** Verify that all template files exist in `prompt-optimizer/backend/templates/` and are named correctly (lowercase).

### Error: "Connection refused" or CORS errors

**Solution:** 
- Make sure the backend server is running on port 8000
- Check that the frontend URL is in the CORS allow list in `main.py`
- If running from a different origin, you may need to add it to the CORS configuration

### Error: "Failed to optimize prompt with GROQ"

**Solution:**
- Verify your Groq API key is valid
- Check your Groq account has available credits/quota
- Check your internet connection

### Backend starts but requests fail

**Check:**
1. Is the `.env` file in the correct location? (`prompt-optimizer/backend/.env`)
2. Does the `.env` file contain `GROQ_API_KEY=...` (no spaces around the `=`)?
3. Did you restart the server after creating/modifying the `.env` file?

## Next Steps

Once everything is set up:

1. ✅ Backend server running on port 8000
2. ✅ Frontend can connect to backend
3. ✅ Test with a simple prompt to verify end-to-end flow

You're ready to optimize prompts! 🚀



