import type { Notary } from "../types/scheduling.types";
import { mockSuitableNotaries } from "../data/mockData";

export const notaryService = {
  // Lấy danh sách notaries với filter
  getNotaries: async (params?: {
    serviceType?: string;
    state?: string;
    available?: boolean;
  }): Promise<Notary[]> => {
    // Mock API call - sau này thay bằng call API thật
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockSuitableNotaries];
    
    // Filter theo service type
    if (params?.serviceType) {
      filtered = filtered.filter(notary => 
        notary.services?.toLowerCase().includes(params.serviceType!.toLowerCase())
      );
    }
    
    // Filter theo state (có thể thêm sau)
    // if (params?.state) {
    //   filtered = filtered.filter(notary => notary.state === params.state);
    // }
    
    // Filter theo availability
    if (params?.available === true) {
      filtered = filtered.filter(notary => 
        notary.available !== "Not available this time slot"
      );
    }
    
    // Sort by rating (cao nhất lên đầu)
    return filtered.sort((a, b) => (b?.rating ?? 0) - (a?.rating ?? 0));
  },

  // Lấy chi tiết notary
  getNotaryById: async (id: string): Promise<Notary | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const notary = mockSuitableNotaries.find(n => n.id === id);
    if (!notary) throw new Error('Notary not found');
    return notary;
  },
};