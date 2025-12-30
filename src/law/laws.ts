import fs from "fs";
import path from "path";

export type Laws = {
  MASTER_CONSTITUTION: string;
  MASTER_RUNTIME: string;
  MASTER_INFRASTRUCTURE: string;
  MASTER_WORLD: string;
  SYSTEM_PROHIBITIONS: string;
};

function readRequiredFile(absPath: string): string {
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
 * Relative to repo root.
 * If ANY file is missing, the process must crash.
 */
export function loadLawsOrThrow(): Laws {
  const root = process.cwd();
  const lawDir = path.join(root, "laws");

  const p = (name: string) => path.join(lawDir, name);

  const laws: Laws = {
    MASTER_CONSTITUTION: readRequiredFile(p("MASTER_CONSTITUTION.md")),
    MASTER_RUNTIME: readRequiredFile(p("MASTER_RUNTIME.md")),
    MASTER_INFRASTRUCTURE: readRequiredFile(p("MASTER_INFRASTRUCTURE.md")),
    MASTER_WORLD: readRequiredFile(p("MASTER_WORLD.md")),
    SYSTEM_PROHIBITIONS: readRequiredFile(p("SYSTEM_PROHIBITIONS.md")),
  };

  return laws;
}

/**
 * Loaded once at boot.
 * Treated as immutable law.
 */
export const LAWS: Laws = loadLawsOrThrow();