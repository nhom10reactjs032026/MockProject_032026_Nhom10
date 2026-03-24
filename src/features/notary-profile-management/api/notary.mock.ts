import type { Notary } from '../types/notary.types';

export const MOCK_NOTARIES: Notary[] = [
  {
    id: '1001',
    name: 'James Smith',
    capability: 'Mobile, RON, Loan Signing',
    state: 'California',
    expiryDate: '2025-01-01',
    branch: 'Seattle Branch',
    status: 'Active',
    image: '/img/jsmith.jpg'
  },
  {
    id: '1002',
    name: 'Emily Johnson',
    capability: 'Mobile, Loan Signing, Apostille',
    state: 'Texas',
    expiryDate: '2026-05-10',
    branch: 'Austin Branch',
    status: 'Active',
    image: '/img/ejohnson.jpg'
  },
  {
    id: '1003',
    name: 'Michael Williams',
    capability: 'RON',
    state: 'New York',
    expiryDate: '2023-03-15',
    branch: 'Chicago Branch',
    status: 'Expired',
    image: '/img/mwilliams.jpg'
  },
  {
    id: '1004',
    name: 'Jessica Brown',
    capability: 'Mobile, RON, Loan Signing, Apostille',
    state: 'Florida',
    expiryDate: '2027-07-20',
    branch: 'Denver Branch',
    status: 'Deactive',
    image: '/img/jbrown.jpg'
  },
  {
    id: '1005',
    name: 'David Jones',
    capability: 'Mobile, Apostille',
    state: 'Washington',
    expiryDate: '2022-09-01',
    branch: 'Boston Branch',
    status: 'Expired',
    image: '/img/djones.jpg'
  },
  {
    id: '1006',
    name: 'Sarah Garcia',
    capability: 'RON, Loan Signing',
    state: 'Nevada',
    expiryDate: '2028-01-10',
    branch: 'Miami Branch',
    status: 'Deactive',
    image: '/img/sgarcia.jpg'
  },
  {
    id: '1010',
    name: 'Amanda Martinez',
    capability: 'Mobile, RON, Apostille',
    state: 'Michigan',
    expiryDate: '2024-08-08',
    branch: 'San Diego Branch',
    status: 'Expired',
    image: '/img/amartinez.jpg'
  }
];
