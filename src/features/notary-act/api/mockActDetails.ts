import { mockActs } from './mockData';

export interface ActDetail {
  id: string;
  signers: string[];
  venue: string;
  date: string;
  certificateActType: string; 
  fee?: number;
  locationOfAct?: string;
  additionalNotes?: string;
  thumbprintImage?: string | null;
  journalCompliant?: boolean;
  timeline?: {
    status: 'draft' | 'completed' | 'locked';
    draftedAt?: string;
    completedAt?: string;
    lockedAt?: string;
  };
}

export const mockActDetails: Record<string, ActDetail> = {
  '1': {
    id: '1',
    signers: ['Robert Miller'],
    venue: 'County of Los Angeles, State of California',
    date: '2025-03-26',
    certificateActType: 'Acknowledgment',
    fee: 15.00,
    locationOfAct: '123 Main St, Los Angeles, CA',
    additionalNotes: 'Signer appeared in person.',
    thumbprintImage: null,
    journalCompliant: false,
    timeline: {
      status: 'completed',
      draftedAt: '2025-03-26T10:30:00Z',
      completedAt: '2025-03-26T10:45:00Z',
      lockedAt: '2025-03-26T10:50:00Z',
    },
  },
  '2': {
    id: '2',
    signers: ['Alice Thompson'],
    venue: 'County of Miami-Dade, State of Florida',
    date: '2025-03-25',
    certificateActType: 'Acknowledgment',
    fee: 12.50,
    locationOfAct: '456 Ocean Dr, Miami, FL',
    additionalNotes: '',
    thumbprintImage: null,
    journalCompliant: false,
    timeline: {
      status: 'draft',
      draftedAt: '2025-03-25T09:00:00Z',
    },
  },
  '3': {
    id: '3',
    signers: ['John Doe', 'Jane Doe'],
    venue: 'County of Harris, State of Texas',
    date: '2025-03-24',
    certificateActType: 'Jurat',
    fee: 20.00,
    locationOfAct: '789 Business Park, Houston, TX',
    additionalNotes: 'Both signers present.',
    thumbprintImage: null,
    journalCompliant: false,
    timeline: {
      status: 'draft',
      draftedAt: '2025-03-24T14:20:00Z',
    },
  },
  '4': {
    id: '4',
    signers: ['Kevin Brown'],
    venue: 'County of Los Angeles, State of California',
    date: '2025-03-26',
    certificateActType: 'Acknowledgment',
    fee: 15.00,
    locationOfAct: '321 Elm St, Los Angeles, CA',
    additionalNotes: '',
    thumbprintImage: null,
    journalCompliant: false,
    timeline: {
      status: 'completed',
      draftedAt: '2025-03-26T13:15:00Z',
      completedAt: '2025-03-26T13:30:00Z',
      lockedAt: '2025-03-26T13:35:00Z',
    },
  },
};


export const getFullActInfo = (actId:string) => {
    const baseAct = mockActs.find(act => act.id === actId)
    const details = mockActDetails[actId]
    if(!baseAct || !details) return null
    return {...baseAct, ...details}
}