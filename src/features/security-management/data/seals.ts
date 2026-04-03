export type SealStatus = "Active" | "Expired" | "Revoked";
export type SealType = "Electronic" | "Physical" | "Signature";
import { getSealStatusOverride } from "./seal-status-store";
export type SealRow = {
  id: string;
  notary: string;
  state: string;
  type: SealType;
  issueDate: string;
  expDate: string;
  status: SealStatus;
};

export type ElectronicMeta = {
  provider: string;
  serialNumber: string;
  impressionText?: string;
  impressionImageUrl?: string; // sau này nối API thì dùng url này
};

export type PhysicalMeta = {
  shape: string;
  size: string;
  materialType: string;
  impressionText?: string;
  impressionImageUrl?: string;
};

export type SealDetail = SealRow & {
  // có thể dùng để render detail tùy type
  electronic?: ElectronicMeta;
  physical?: PhysicalMeta;
};

export const SEAL_ROWS: SealRow[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `98765${i}`,
  notary: ["Alice Smith", "John Smith", "Mary Ellis"][i % 3],
  state: ["CA", "NY", "TX"][i % 3],
  type: i % 3 === 0 ? "Electronic" : i % 3 === 1 ? "Physical" : "Signature",
  issueDate: "Oct 18, 2023",
  expDate: "Oct 18, 2026",
  status: (i % 4 === 0 ? "Revoked" : i % 5 === 0 ? "Expired" : "Active") as SealStatus,
}));

/**
 * Metadata chi tiết theo từng seal id.
 * (Bạn có thể mở rộng thêm field ở đây mà không phải sửa pages.)
 */
export const SEAL_DETAILS: Record<string, Omit<SealDetail, keyof SealRow>> = {
  // sample mapping; các id khác sẽ fallback mặc định
  "987650": {
    electronic: {
      provider: "DigiCert",
      serialNumber: "0123456",
      impressionText: "Sample electronic seal impression",
    },
  },
  "987651": {
    physical: {
      shape: "Round",
      size: "1.5-inch",
      materialType: "Rubber Stamp",
      impressionText: "Sample physical seal impression",
    },
  },
};

export function findSealById(id: string): SealRow | undefined {
  return SEAL_ROWS.find((x) => x.id === id);
}

function defaultMetaForType(type: SealType) {
  if (type === "Electronic" || type === "Signature") {
    return {
      electronic: {
        provider: "DigiCert",
        serialNumber: "0123456",
        impressionText: "Default electronic impression",
      } satisfies ElectronicMeta,
    };
  }
  return {
    physical: {
      shape: "Round",
      size: "1.5-inch",
      materialType: "Rubber Stamp",
      impressionText: "Default physical impression",
    } satisfies PhysicalMeta,
  };
}

/**
 * Hàm dùng cho Detail pages: trả về full object (row + metadata).
 * - Nếu không có id -> undefined
 * - Nếu id không tồn tại trong SEAL_ROWS -> undefined
 * - Nếu không có metadata trong SEAL_DETAILS -> fallback theo type
 */
export function getSealDetail(id: string): SealDetail | undefined {
  const base = findSealById(id);
  if (!base) return undefined;

  // lấy status override từ localStorage (nếu có)
  const overrideStatus = getSealStatusOverride(id);
  const baseWithOverride = overrideStatus ? { ...base, status: overrideStatus } : base;

  const extra = SEAL_DETAILS[id] ?? defaultMetaForType(baseWithOverride.type);
  return { ...baseWithOverride, ...extra };
}