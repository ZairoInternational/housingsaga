import { randomInt } from "crypto";

import { House } from "@/models/houseModel";

/** No 0/O or 1/I, so codes stay easy to read. */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const HSID_LENGTH = 6;

export function generateHsid(): string {
  let code = "";
  for (let i = 0; i < HSID_LENGTH; i++) {
    code += ALPHABET[randomInt(ALPHABET.length)];
  }
  return code;
}

/** Returns a code that is not already stored. Does not write anything. */
export async function allocateHsid(reserved: Set<string> = new Set()): Promise<string> {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = generateHsid();
    if (reserved.has(code)) continue;
    const existing = await House.exists({ HSID: code });
    if (!existing) return code;
  }
  throw new Error("Could not allocate a unique HSID");
}
