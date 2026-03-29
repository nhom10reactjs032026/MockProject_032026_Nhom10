import type { Act } from '../types/act.types';

export const mockActs: Act[] = [
  {
    id: '1',
    actId: '#ACT-94021',
    type: 'Real Estate Closing',
    reference: 'Ref: RE-452-B',
    clientName: 'Sarah Jenkins',
    clientType: 'For: Robert Miller',
    dateTime: 'Oct 24, 2023',
    time: '10:45 PM',
    timezone: 'EST',
    state: 'California',
    status: 'Completed',
    risk: 'Low'
  },
  {
    id: '2',
    actId: '#ACT-94022',
    type: 'Wills & Trusts',
    reference: 'Ref: WT-4421',
    clientName: 'David Chen',
    clientType: 'For: Alice Thompson',
    dateTime: 'Oct 25, 2023',
    time: '10:15 AM',
    timezone: 'EST',
    state: 'Florida',
    status: 'Inprocess',
    risk: 'Medium'
  },
  {
    id: '3',
    actId: '#ACT-94023',
    type: 'Power of Attorney',
    reference: 'Ref: PA-662-A',
    clientName: 'Mark Wilson',
    clientType: 'For: Global Trade Inc.',
    dateTime: 'Oct 25, 2023',
    time: '11:30 AM',
    timezone: 'EST',
    state: 'Texas',
    status: 'Voided',
    risk: 'High'
  },
  {
    id: '4',
    actId: '#ACT-94024',
    type: 'Affidavits',
    reference: 'Ref: AF-220-X',
    clientName: 'Sarah Jenkins',
    clientType: 'For: Kevin Brown',
    dateTime: 'Oct 26, 2023',
    time: '04:00 PM',
    timezone: 'EST',
    state: 'California',
    status: 'Completed',
    risk: 'Low'
  }
];
