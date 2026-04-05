const { GoogleGenAI } = require("@google/genai");
async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: "AIzaSyD7ZgQ6uQEOtd3Gs95Mw_Q163vCtDCGBkE" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "hello",
    });
    console.log("SUCCESS:", response.text);
  } catch (e) {
    console.log("ERROR:", e);
  }
}
test();
