#!/usr/bin/env node

/**
 * Test script: Send a welcome email via Railway backend (Brevo)
 * Usage:
 *   node test-brevo.js <your-email>
 *   node test-brevo.js "test@example.com"
 */

import http from "http";
import https from "https";

const email = process.argv[2] || "test@example.com";
const railwayUrl = "https://ai-runner-future-platform-production.up.railway.app";
const endpoint = "/send-email";
const fullUrl = railwayUrl + endpoint;

console.log(`Testing Brevo welcome email via Railway backend...`);
console.log(`Target email: ${email}`);
console.log(`URL: POST ${fullUrl}\n`);

const payload = JSON.stringify({ email });

const urlObj = new URL(fullUrl);
const options = {
  hostname: urlObj.hostname,
  port: urlObj.port || 443,
  path: urlObj.pathname + urlObj.search,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  },
};

const client = urlObj.protocol === "https:" ? https : http;

const req = client.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    console.log(`Response Status: ${res.statusCode}`);
    console.log(`Response Headers:`, res.headers);
    console.log(`Response Body:`, data);
    if (res.statusCode === 200) {
      console.log("\n✅ Success! Welcome email queued.");
    } else {
      console.log("\n❌ Error. Check the response body above.");
    }
  });
});

req.on("error", (error) => {
  console.error(`Request failed:`, error.message);
  process.exit(1);
});

req.write(payload);
req.end();
