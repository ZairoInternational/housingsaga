export const FIRST_ADDRESS_QUOTA_PREFIX = "__FIRST_ADDRESS_QUOTA__";

export function isFirstAddressQuotaToken(token: string): boolean {
  return token.startsWith(`${FIRST_ADDRESS_QUOTA_PREFIX}:`);
}

export function createFirstAddressQuotaToken(userId: string): string {
  const userPart = userId.trim();
  const timePart = Date.now().toString(36);
  const randPart = Math.random().toString(36).slice(2, 10);
  return `${FIRST_ADDRESS_QUOTA_PREFIX}:${userPart}:${timePart}:${randPart}`;
}

