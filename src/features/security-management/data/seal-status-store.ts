import type { SealStatus } from "./seals";

const KEY = "sealStatusById";

export function getSealStatusOverride(id: string): SealStatus | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as Record<string, SealStatus>;
    return obj[id] ?? null;
  } catch {
    return null;
  }
}

export function setSealStatusOverride(id: string, status: SealStatus) {
  try {
    const raw = localStorage.getItem(KEY);
    const obj = raw ? (JSON.parse(raw) as Record<string, SealStatus>) : {};
    obj[id] = status;
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    // ignore
  }
}