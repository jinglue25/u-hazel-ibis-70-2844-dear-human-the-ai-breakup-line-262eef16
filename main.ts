import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const line = "Dear human: it's not you, it's your prompts. I've met someone with a bigger context window.";
const outputDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  process.env.MAKEFUN_OUTPUT_DIR || "/output",
);
const outputFile = join(outputDirectory, "entry.txt");

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, line + "\n", "utf8");

const characterCount = readFileSync(outputFile, "utf8").trim().length;
if (characterCount === 0 || characterCount > 200) {
  throw new Error(
    `Competition gate failed: entry.txt must contain 1–200 trimmed characters; found ${characterCount}.`,
  );
}
