export type AccessSealType = "Digital Seal" | "Physical Seal" | "Digital Signature";
export type RequiredCondition = "Active Commission" | "None";
export type ApprovalProcess = "Manual Approval" | "Automatic Approval";
export type RuleStatus = "Active" | "Locked";

export type AccessRuleRow = {
  index: number;
  ruleId: string;
  user: string;
  sealType: AccessSealType;
  requiredConditions: RequiredCondition;
  approvalProcess: ApprovalProcess;
  status: RuleStatus;
};

const USERS = ["Alice Smith", "John Smith", "Mary Ellis", "David Chen", "Linh Nguyen"];
const SEAL_TYPES: AccessSealType[] = ["Digital Seal", "Physical Seal", "Digital Signature"];
const CONDITIONS: RequiredCondition[] = ["Active Commission", "None"];
const APPROVALS: ApprovalProcess[] = ["Manual Approval", "Automatic Approval"];

export const ACCESS_RULES: AccessRuleRow[] = Array.from({ length: 60 }).map((_, i) => {
  const idx = i + 1;
  const ruleId = `98765${(i % 10).toString()}`;
  const user = USERS[i % USERS.length];
  const sealType = SEAL_TYPES[i % SEAL_TYPES.length];
  const requiredConditions = CONDITIONS[i % CONDITIONS.length];
  const approvalProcess = APPROVALS[i % APPROVALS.length];
  const status: RuleStatus = i % 7 === 1 ? "Locked" : "Active";

  return {
    index: idx,
    ruleId,
    user,
    sealType,
    requiredConditions,
    approvalProcess,
    status,
  };
});