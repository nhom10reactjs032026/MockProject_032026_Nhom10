export type ActStatus = 'Completed' | 'Inprocess' | 'Voided';
export type ActRisk = 'Low' | 'Medium' | 'High';

export interface Act {
  id: string;
  actId: string;
  type: string;
  reference: string;
  clientName: string;
  clientType: string;
  dateTime: string;
  time: string;
  timezone: string;
  state: string;
  status: ActStatus;
  risk: ActRisk;
}

export interface ActFilters {
  search?: string;
  type?: string;
  status?: string;
  dateRange?: string;
}
