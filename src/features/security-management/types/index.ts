// src/features/seal-management/types/index.ts
export interface Seal {
    id: string;
    name: string;
    type: 'Electronic' | 'Physical';
    status: 'Active' | 'Revoked' | 'Expired';
    expiryDate: string;
    state: string;
}

export interface SealStats {
    totalSeals: number;
    totalCertificates: number;
    expiringSoon: number;
    revoked: number;
}