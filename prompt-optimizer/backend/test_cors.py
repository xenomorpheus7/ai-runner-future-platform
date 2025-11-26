"""
Quick test script to verify CORS is working correctly
Run this to test the /optimize endpoint
"""
import requests

# Test OPTIONS request (preflight)
print("Testing OPTIONS request (CORS preflight)...")
response = requests.options(
    "http://localhost:8000/optimize",
    headers={
        "Origin": "http://localhost:8080",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
    }
)
print(f"Status: {response.status_code}")
print(f"Headers: {dict(response.headers)}")
print(f"Content: {response.text}")
print()

# Test POST request
print("Testing POST request...")
response = requests.post(
    "http://localhost:8000/optimize",
    json={"prompt": "test prompt", "model": "midjourney"},
    headers={"Origin": "http://localhost:8080"}
)
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")



