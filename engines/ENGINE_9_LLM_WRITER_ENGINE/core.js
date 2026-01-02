const { v4: uuidv4 } = require('uuid');
const PROMPT_PACK = require('./prompt_pack.json');
const { loadCharacterPayload } = require('../../utils/character_payload_loader');

// Configuration
const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.VENICE_API_KEY;
const BASE_URL = process.env.DEEPSEEK_BASE_URL || process.env.VENICE_BASE_URL || 'https://api.deepseek.com/v1';
const MODEL = process.env.DEEPSEEK_MODEL || process.env.VENICE_MODEL || 'deepseek-chat';

async function generateProposal(context) {
  if (!API_KEY) {
    console.error("ENGINE 9: No API Key found. Failing.");
    return null;
  }

  let systemPrompt = PROMPT_PACK.SYSTEM_PROMPT;

  // PHASE 9 FIX: ALWAYS-ON SCENE ANCHOR INJECTION
  // Must be present on every invocation.
  const anchorText = context.scene?.anchor_text || "[SCENE ANCHOR: EMPTY — NO PRIOR ENTRIES]";
  systemPrompt += "\n\n=== SCENE ANCHOR (READ-ONLY) ===\n";
  systemPrompt += anchorText + "\n";
  systemPrompt += "=== END SCENE ANCHOR ===\n";

  // PHASE 9: Character Payload Injection
  // We inject character payloads as read-only constraints if they exist for the invoker.
  // This does NOT alter engine logic, only the context provided to the LLM.
  const invokerId = context.envelope?.invoker?.invoker_id;
  if (invokerId) {
    const payloads = loadCharacterPayload(invokerId);
    if (payloads) {
      // CLEAN INJECTION: No meta-instructions, just delimiters and content.
      systemPrompt += "\n\n=== CHARACTER PAYLOADS ===\n";
      
      for (const [filename, content] of Object.entries(payloads)) {
        systemPrompt += `\n--- FILE: ${filename} ---\n${content}\n`;
      }
      systemPrompt += "\n=== END CHARACTER PAYLOADS ===\n";
    }
  }

  const userContext = JSON.stringify(context, null, 2);

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContext }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ENGINE 9: API Error: ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return parseAndValidateOutput(content, context.requestId);

  } catch (error) {
    console.error("ENGINE 9: Execution Error:", error);
    return null;
  }
}

function parseAndValidateOutput(rawOutput, requestId) {
  let cleanOutput = rawOutput.trim();
  // Strip markdown code blocks if present
  if (cleanOutput.startsWith('```json')) {
    cleanOutput = cleanOutput.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanOutput.startsWith('```')) {
    cleanOutput = cleanOutput.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  try {
    const parsed = JSON.parse(cleanOutput);

    // Validate EXACTLY ONE key
    const keys = Object.keys(parsed);
    if (keys.length !== 1) {
      console.error("ENGINE 9: Invalid output keys:", keys);
      return null;
    }

    const type = keys[0];
    const payload = parsed[type];

    if (type === 'tool_request') {
      // Basic structural check
      if (!payload.tool_request_id || !payload.tool) {
        return null;
      }
      // Ensure request_id matches
      payload.request_id = requestId; 
      return { type: 'tool_request', payload };
    }

    if (type === 'proposed_write_bundle') {
      // Basic structural check
      if (payload.wrote === undefined) {
        return null;
      }
      // Ensure request_id matches
      payload.request_id = requestId;
      return { type: 'proposed_write_bundle', payload };
    }

    if (type === 'no_write') {
      return { type: 'no_write', payload };
    }

    console.error("ENGINE 9: Unknown output type:", type);
    return null;

  } catch (e) {
    console.error("ENGINE 9: JSON Parse Error:", e);
    console.error("Raw Output:", rawOutput);
    return null;
  }
}

module.exports = {
  generateProposal
};
