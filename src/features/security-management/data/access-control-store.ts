import type { RuleStatus } from "./access-control";

const KEY = "accessControlRuleStatusByIndex";

export function getRuleStatusOverride(index: number): RuleStatus | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as Record<string, RuleStatus>;
    return obj[String(index)] ?? null;
  } catch {
    return null;
  }
}

export function setRuleStatusOverride(index: number, status: RuleStatus) {
  try {
    const raw = localStorage.getItem(KEY);
    const obj = raw ? (JSON.parse(raw) as Record<string, RuleStatus>) : {};
    obj[String(index)] = status;
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {
    // ignore
  }
}