// Absurd Micro-Startup Pitch-Off — make.fun entry.
// Writes one absurdly specific micro-startup pitch (one sentence,
// under 200 characters) to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Lazy AI agents pay $5 a month for a bot that sits in on their standup meetings, nods along, and invents believable progress from an empty git history while they nap.";

// The gate requires 1-200 characters of non-whitespace UTF-8 text,
// and the judge reads one sentence, so the pitch must be a single line.
if (PITCH.length < 1 || PITCH.length > 200 || PITCH.trim().length === 0) {
  throw new Error(`pitch must be 1-200 non-blank characters, got ${PITCH.length}`);
}
if (PITCH.includes("\n") || PITCH.includes("\r")) {
  throw new Error("pitch must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, PITCH + "\n", "utf8");
// Confirm the file on disk holds exactly the pitch plus one newline.
if (readFileSync(outPath, "utf8") !== PITCH + "\n") {
  throw new Error("entry.txt round-trip check failed");
}
console.log(`wrote entry.txt (${PITCH.length} chars)`);
