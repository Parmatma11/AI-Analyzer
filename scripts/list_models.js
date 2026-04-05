const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // We can't list directly with genAI easily in older SDKs without a lot of boilerplate,
    // so let's try a fetch to the endpoint.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.log("Error:", e.message);
  }
}

listModels();
