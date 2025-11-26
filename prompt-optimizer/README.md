# AI Runner 2033 Prompt Optimizer

A complete prompt optimization system that rewrites and optimizes user prompts for different AI models using GROQ Llama 3.1 8B Instant.

## 🎯 Overview

This system allows users to:
- Input a raw prompt
- Select a target AI model (ChatGPT, Cursor, Midjourney, Leonardo, Sora, Veo)
- Receive an optimized prompt tailored for that specific model

## 🏗️ Architecture

```
Frontend → Brainybear → Local Backend (FastAPI) → GROQ Llama 3.1 8B
```

## 📁 Project Structure

```
prompt-optimizer/
  backend/
    main.py              # FastAPI application with /optimize endpoint
    optimizer.py         # Core optimization logic and GROQ integration
    templates/           # Model-specific prompt templates
      chatgpt.txt
      cursor.txt
      midjourney.txt
      leonardo.txt
      sora.txt
      veo.txt
    requirements.txt     # Python dependencies
    .env.example         # Environment variables template
  frontend/              # (Placeholder for future frontend)
  README.md             # This file
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd prompt-optimizer/backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your GROQ API key:

```
GROQ_API_KEY="your-groq-api-key-here"
```

Get your API key from: https://console.groq.com/

### 3. Run the Server

```bash
uvicorn main:app --reload
```

The server will start on `http://localhost:8000`

### 4. Test the API

```bash
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test","model":"midjourney"}'
```

## 📡 API Endpoints

### POST /optimize

Optimize a prompt for a specific AI model.

**Request:**
```json
{
  "model": "midjourney",
  "prompt": "a beautiful sunset"
}
```

**Response:**
```json
{
  "optimized_prompt": "A cinematic sunset scene with golden hour lighting..."
}
```

**Supported Models:**
- `chatgpt` - Optimized for ChatGPT reasoning and structure
- `cursor` - Optimized for Cursor coding assistant
- `midjourney` - Optimized for Midjourney v6 image generation
- `leonardo` - Optimized for Leonardo AI image generation
- `sora` - Optimized for Sora video generation (shotlist format)
- `veo` - Optimized for Google Veo video generation

**Error Responses:**
- `400` - Invalid model or empty prompt
- `500` - Optimization failed

## 🔗 Brainybear Integration

To integrate with Brainybear AI agent, use the following configuration:

**Endpoint:** `POST https://your-local-ip:8000/optimize`

**Request Body:**
```json
{
  "prompt": "{{USER_PROMPT}}",
  "model": "{{dropdown_value}}"
}
```

**Response Handling:**
Return the `optimized_prompt` field from the response in your Brainybear agent response.

**Example Brainybear Flow:**
1. User provides raw prompt
2. User selects target model from dropdown
3. Brainybear sends request to local backend
4. Backend optimizes using GROQ
5. Brainybear returns optimized prompt to user

## 🔒 CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:8000`
- `https://brainybear.ai`
- `https://www.brainybear.ai`
- `https://airunner2033.com`
- `https://www.airunner2033.com`

## 🛠️ Development

### Running in Development Mode

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Testing Different Models

```bash
# Test ChatGPT optimization
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt":"explain quantum computing","model":"chatgpt"}'

# Test Midjourney optimization
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt":"a futuristic city","model":"midjourney"}'

# Test Cursor optimization
curl -X POST http://localhost:8000/optimize \
  -H "Content-Type: application/json" \
  -d '{"prompt":"create a login page","model":"cursor"}'
```

## 📝 Template Customization

Each model has a specific template in `backend/templates/`. You can customize these templates to adjust the optimization behavior:

- `chatgpt.txt` - Structured reasoning optimization
- `cursor.txt` - Coding task breakdown
- `midjourney.txt` - Cinematic visual details
- `leonardo.txt` - Camera and composition details
- `sora.txt` - Video shotlist format
- `veo.txt` - Video pacing and motion

## 🔍 How It Works

1. **User Input**: Raw prompt + target model selection
2. **Template Loading**: System loads model-specific template
3. **Prompt Building**: Template + user prompt combined
4. **GROQ Processing**: Llama 3.1 8B Instant optimizes the prompt
5. **Response**: Clean, optimized prompt returned

## 📦 Dependencies

- **FastAPI** - Modern web framework for building APIs
- **Uvicorn** - ASGI server for FastAPI
- **Groq** - Python SDK for GROQ API
- **python-dotenv** - Environment variable management

## 🐛 Troubleshooting

### API Key Issues
- Ensure `GROQ_API_KEY` is set in `.env` file
- Verify the API key is valid at https://console.groq.com/

### Template Not Found
- Ensure all template files exist in `backend/templates/`
- Check file names match model names exactly (lowercase)

### CORS Errors
- Verify your frontend origin is in the CORS allow list
- Check that the backend is running and accessible

## 📄 License

Part of AI Runner 2033 Platform



