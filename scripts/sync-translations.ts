import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type Json = string | { [key: string]: Json };

const root = process.cwd();
const messagesDir = resolve(root, "messages");
const hashPath = resolve(messagesDir, "source-hashes.json");

loadEnv(resolve(root, ".env"));

const locale = readLocaleArg();
const en = readJson(resolve(messagesDir, "en.json"));
const targetPath = resolve(messagesDir, `${locale}.json`);
const target = existsSync(targetPath) ? readJson(targetPath) : {};
const hashFileExists = existsSync(hashPath);
const storedHashes = hashFileExists
  ? (JSON.parse(readFileSync(hashPath, "utf8")) as Record<string, string>)
  : {};

const enFlat = flatten(en);
const targetFlat = flatten(target);
const nextHashes: Record<string, string> = {};
const pending: { path: string; text: string }[] = [];
const translated = new Map<string, string>();

for (const [path, english] of enFlat) {
  const hash = sha(english);
  const current = targetFlat.get(path);
  const unchanged =
    typeof current === "string" &&
    current.trim().length > 0 &&
    (!hashFileExists || storedHashes[path] === hash);

  if (unchanged) {
    translated.set(path, current);
    nextHashes[path] = hash;
    continue;
  }

  if (!english.trim()) {
    translated.set(path, english);
    nextHashes[path] = hash;
    continue;
  }

  pending.push({ path, text: english });
}

console.log(
  `${pending.length} string(s) to translate into ${locale}. ${translated.size} left unchanged.`,
);

async function main() {
  let failed = 0;
  for (const item of pending) {
    try {
      const greek = await translate(item.text, locale);
      translated.set(item.path, greek);
      nextHashes[item.path] = sha(item.text);
      console.log(`  ${item.path}`);
      await sleep(300);
    } catch (error) {
      failed += 1;
      const previous = targetFlat.get(item.path);
      translated.set(item.path, previous ?? item.text);
      if (previous && storedHashes[item.path]) {
        nextHashes[item.path] = storedHashes[item.path];
      }
      console.error(`  failed ${item.path}: ${error instanceof Error ? error.message : error}`);
    }
  }

  writeFileSync(targetPath, JSON.stringify(rebuild(en, translated), null, 2) + "\n");
  writeFileSync(hashPath, JSON.stringify(nextHashes, null, 2) + "\n");

  if (failed > 0) {
    console.error(`${failed} string(s) were not translated. Run the command again later.`);
    process.exitCode = 1;
  } else {
    console.log(`Updated messages/${locale}.json`);
  }
}

void main();

function readLocaleArg() {
  const index = process.argv.indexOf("--locale");
  const value = index >= 0 ? process.argv[index + 1] : "el";
  if (!value || !/^[a-z]{2}(-[A-Z]{2})?$/.test(value) || value === "en") {
    throw new Error("Pass a target locale such as --locale el");
  }
  return value;
}

function loadEnv(path: string) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (process.env[key]) continue;
    process.env[key] = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
}

function readJson(path: string): Json {
  return JSON.parse(readFileSync(path, "utf8")) as Json;
}

function flatten(node: Json, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof node === "string") {
    if (prefix) out.set(prefix, node);
    return out;
  }
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    for (const [childPath, text] of flatten(value, path)) {
      out.set(childPath, text);
    }
  }
  return out;
}

function rebuild(template: Json, values: Map<string, string>, prefix = ""): Json {
  if (typeof template === "string") {
    return values.get(prefix) ?? template;
  }
  const out: { [key: string]: Json } = {};
  for (const [key, value] of Object.entries(template)) {
    const path = prefix ? `${prefix}.${key}` : key;
    out[key] = rebuild(value, values, path);
  }
  return out;
}

function sha(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

async function translate(text: string, targetLocale: string) {
  const parts = splitForApi(text, 420);
  const translatedParts: string[] = [];
  for (const part of parts) {
    translatedParts.push(await translateChunk(part, targetLocale));
  }
  return translatedParts.join("");
}

async function translateChunk(text: string, targetLocale: string) {
  const { masked, tokens } = shield(text);
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", masked);
  url.searchParams.set("langpair", `en|${targetLocale}`);
  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) url.searchParams.set("de", email);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`MyMemory responded with ${response.status}`);
  }

  const body = (await response.json()) as {
    responseStatus?: number;
    responseData?: { translatedText?: string };
  };
  const result = body.responseData?.translatedText?.trim() ?? "";
  if (!result || body.responseStatus !== 200 || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(result)) {
    throw new Error(result || "Empty translation");
  }

  return restore(result, tokens);
}

function shield(text: string) {
  const tokens: string[] = [];
  const masked = text.replace(/HousingSaga|\{[A-Za-z0-9_]+\}/g, (match) => {
    const token = `[[${tokens.length}]]`;
    tokens.push(match);
    return token;
  });
  return { masked, tokens };
}

function restore(text: string, tokens: string[]) {
  let restored = text;
  tokens.forEach((token, index) => {
    const marker = `[[${index}]]`;
    if (!restored.includes(marker)) {
      throw new Error(`Translation dropped placeholder ${token}`);
    }
    restored = restored.replace(marker, token);
  });
  return restored;
}

function splitForApi(text: string, maxBytes: number) {
  if (Buffer.byteLength(text) <= maxBytes) return [text];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence}` : sentence;
    if (Buffer.byteLength(next) > maxBytes && current) {
      chunks.push(current);
      current = sentence;
    } else {
      current = next;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function sleep(ms: number) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}
