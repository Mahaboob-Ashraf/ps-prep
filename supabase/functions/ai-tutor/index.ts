import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// 1. LOAD YOUR 5 KEYS
const API_KEYS = [
  Deno.env.get("GEMINI_KEY_1"),
  Deno.env.get("GEMINI_KEY_2"),
  Deno.env.get("GEMINI_KEY_3"),
  Deno.env.get("GEMINI_KEY_4"),
  Deno.env.get("GEMINI_KEY_5"),
].filter(Boolean) as string[];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { query, context } = await req.json();

    // 2. ROTATION LOGIC: Pick a random key
    const selectedKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

    if (!selectedKey) {
      throw new Error(
        "No API keys configured. Please set secrets in Supabase."
      );
    }

    const systemPrompt = `
      You are a Python tutor for a college student.
      Problem: "${context.title}".
      Description: "${context.problem}".
      Student Code:
      \`\`\`python
      ${context.userCode}
      \`\`\`
      Student Question: "${query}"
      
      Rules:
      1. Be concise (2-3 sentences max).
      2. DO NOT give the full solution code unless strictly asked.
      3. Focus on logic and syntax hints.
    `;

    // 3. Call Google API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${selectedKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return new Response(
        JSON.stringify({
          answer:
            "I'm a bit overwhelmed right now. Try again in a few seconds!",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiAnswer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a hint.";

    return new Response(JSON.stringify({ answer: aiAnswer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
