// Simple proxy server for local development
// Run with: node proxy-server.js
// This mimics the Cloudflare Pages Function behavior

import http from 'http';
import https from 'https';

const PORT = 8787;

const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-HF-Token',
    });
    res.end();
    return;
  }

  // Only handle POST requests to /generate-image
  if (req.method === 'POST' && req.url === '/generate-image') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { prompt, negativePrompt, guidanceScale, numInferenceSteps, width, height } = data;

        if (!prompt) {
          res.writeHead(400, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(JSON.stringify({ error: 'Prompt is required' }));
          return;
        }

        // Get token from header or environment
        const HF_TOKEN = req.headers['x-hf-token'] || process.env.HF_TOKEN || process.env.VITE_HF_TOKEN;

        if (!HF_TOKEN) {
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(JSON.stringify({ error: 'Hugging Face token not configured' }));
          return;
        }

        // Build the full prompt
        const fullPrompt = negativePrompt 
          ? `${prompt}. Negative prompt: ${negativePrompt}`
          : prompt;

        // Call Hugging Face API (new endpoint)
        const hfRequest = https.request(
          'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${HF_TOKEN}`,
            },
          },
          (hfResponse) => {
            if (hfResponse.statusCode === 503) {
              res.writeHead(503, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              });
              res.end(JSON.stringify({ error: 'Model is loading. Please wait a moment and try again.' }));
              return;
            }

            if (!hfResponse.statusCode || hfResponse.statusCode >= 400) {
              let errorData = '';
              hfResponse.on('data', chunk => errorData += chunk.toString());
              hfResponse.on('end', () => {
                res.writeHead(hfResponse.statusCode || 500, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({ error: errorData || `API error: ${hfResponse.statusMessage}` }));
              });
              return;
            }

            // Forward the image response
            const contentType = hfResponse.headers['content-type'] || 'image/png';
            res.writeHead(200, {
              'Content-Type': contentType,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-HF-Token',
            });

            hfResponse.pipe(res);
          }
        );

        hfRequest.on('error', (error) => {
          console.error('HF API error:', error);
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          res.end(JSON.stringify({ error: error.message || 'Proxy failure' }));
        });

        hfRequest.write(JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            num_inference_steps: numInferenceSteps || 20,
            guidance_scale: guidanceScale || 7.5,
            width: width || 1024,
            height: height || 1024,
          },
        }));

        hfRequest.end();
      } catch (error) {
        console.error('Proxy error:', error);
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify({ error: error.message || 'Proxy failure' }));
      }
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Make sure VITE_HF_TOKEN or HF_TOKEN is set in your environment`);
});

