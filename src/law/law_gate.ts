/**
 * Mechanical Law Gate.
 * Enforces SYSTEM_PROHIBITIONS on ALL text that might be committed or rendered.
 *
 * Deterministic checks only. No "AI moderation".
 * If blocked => do not write narrative rows, do not update scene, do not render.
 */

function normalize(s) {
  return String(s || "")
    .replace(/\r\n/g, "\n")
    .toLowerCase();
}

// Minimal deterministic prohibition patterns.
// This is intentionally strict on "time skip / montage compression" and "meta system leaks".
const PATTERNS = [
  // Time skips / compression
  { id: "P-TIMESKIP-1", re: /\blater that day\b/i, note: "time skip phrase" },
  { id: "P-TIMESKIP-2", re: /\bhours passed\b/i, note: "time skip phrase" },
  { id: "P-TIMESKIP-3", re: /\beventually\b/i, note: "time skip phrase" },
  { id: "P-TIMESKIP-4", re: /\bthe next (morning|day|week)\b/i, note: "time skip phrase" },
  { id: "P-TIMESKIP-5", re: /\bafter a while\b/i, note: "time skip phrase" },

  // Meta assistant / system leaks
  { id: "P-META-1", re: /\b(as an ai|as a language model|i am constrained|i cannot|i can\'t)\b/i, note: "meta assistant leak" },
  { id: "P-META-2", re: /\b(system prompt|runtime|policy|guidelines)\b/i, note: "system leak" },

  // Retroactive invention / assumption injection
  { id: "P-RETRO-1", re: /\bmust have happened\b/i, note: "retroactive invention" },
  { id: "P-RETRO-2", re: /\bprobably happened\b/i, note: "retroactive invention" },
  { id: "P-RETRO-3", re: /\bwe can assume\b/i, note: "assumption injection" },
];

export function lawGateValidateTextParts(textParts) {
  const joined = normalize((textParts || []).filter(Boolean).join("\n\n"));
  if (!joined.trim()) return { ok: true };

  const reasons = [];
  for (const p of PATTERNS) {
    if (p.re.test(joined)) reasons.push(`${p.id}: ${p.note}`);
  }

  if (reasons.length) return { ok: false, reasons };
  return { ok: true };
}