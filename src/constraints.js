import fs from "fs";
import path from "path";

function readRequiredFile(absPath) {
  if (!fs.existsSync(absPath)) {
    throw new Error(`LAW FILE MISSING: ${absPath}`);
  }
  const txt = fs.readFileSync(absPath, "utf8");
  if (!txt || txt.trim().length === 0) {
    throw new Error(`LAW FILE EMPTY: ${absPath}`);
  }
  return txt;
}

/**
 * Loads ALL authoritative law documents at process start.
 * - No partial loads
 * - No defaults
 * - If any file missing => crash
 *
 * Returns one combined constraints string used in prompts.
 */
export function loadConstraints() {
  const root = process.cwd();
  const lawDir = path.join(root, "laws");
  const p = (name) => path.join(lawDir, name);

  const MASTER_CONSTITUTION = readRequiredFile(p("MASTER_CONSTITUTION.md"));
  const MASTER_RUNTIME = readRequiredFile(p("MASTER_RUNTIME.md"));
  const MASTER_INFRASTRUCTURE = readRequiredFile(p("MASTER_INFRASTRUCTURE.md"));
  const MASTER_WORLD = readRequiredFile(p("MASTER_WORLD.md"));
  const SYSTEM_PROHIBITIONS = readRequiredFile(p("SYSTEM_PROHIBITIONS.md"));

  // Combined prompt constraints.
  // Important: this is verbatim text. No summarization.
  return [
    "=== MASTER_CONSTITUTION ===",
    MASTER_CONSTITUTION,
    "=== MASTER_RUNTIME ===",
    MASTER_RUNTIME,
    "=== MASTER_INFRASTRUCTURE ===",
    MASTER_INFRASTRUCTURE,
    "=== MASTER_WORLD ===",
    MASTER_WORLD,
    "=== SYSTEM_PROHIBITIONS ===",
    SYSTEM_PROHIBITIONS,
  ].join("\n\n");
}