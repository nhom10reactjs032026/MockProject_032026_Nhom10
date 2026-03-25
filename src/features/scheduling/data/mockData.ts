import type { Job, DispatchJob, SuitableNotary } from "../types/scheduling.types";

// ── Jobs ──────────────────────────────────────────────────────

export const mockJobs: Job[] = [
  { id:"JOB-001", customerType:"B2B", customerName:"Acme Corp",         serviceType:"Mobile",       state:"Texas",      date:"2026-03-25", timeStart:"09:00", timeEnd:"11:00", note:"Bring extra forms",      status:"NEW",         assignedNotary:"John Smith" },
  { id:"JOB-002", customerType:"B2C", customerName:"Jane Doe",          serviceType:"RON",          state:"California", date:"2026-03-25", timeStart:"13:00", timeEnd:"14:00",                               status:"PENDING",     assignedNotary:"Mary Johnson" },
  { id:"JOB-003", customerType:"B2B", customerName:"TechStart LLC",     serviceType:"Loan signing", state:"Florida",    date:"2026-03-26", timeStart:"10:00", timeEnd:"12:00", note:"Client prefers morning", status:"IN_PROGRESS", assignedNotary:"Bob Williams" },
  { id:"JOB-004", customerType:"B2C", customerName:"Robert Chen",       serviceType:"Mobile",       state:"New York",   date:"2026-03-27", timeStart:"14:00", timeEnd:"15:30",                               status:"COMPLETED",   assignedNotary:"Sarah Davis" },
  { id:"JOB-005", customerType:"B2B", customerName:"Global Finance Inc",serviceType:"RON",          state:"Texas",      date:"2026-03-28", timeStart:"11:00", timeEnd:"13:00",                               status:"NEW" },
];

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

// ── Dispatch ──────────────────────────────────────────────────

export const mockDispatchJob: DispatchJob = {
  id: "AL-9845",
  service: "Mobile",
  client: "Pacific Title Co.",
  location: "Los Angeles, CA",
  time: "Mar 16, 9:00–11:00am",
  signers: "2 persons",
  type: "Loan Signing",
};

export const mockSuitableNotaries: SuitableNotary[] = [
  { id:"n1", name:"David Chen",   rating:420, distance:"2.4 mi away", services:"RON + Mobile", jobs:4, available:"Available 9–11am", exp:"Dec 2028", avatarInitials:"DC", avatarColor:"#2563eb", verified:true },
  { id:"n2", name:"Angela Ross",  rating:410, distance:"2.9 mi away", services:"RON + Mobile", jobs:3, available:"Available 9–11am", exp:"Dec 2028", avatarInitials:"AR", avatarColor:"#7c3aed", verified:true },
  { id:"n3", name:"Brian Wu",     rating:390, distance:"2.4 mi away", services:"RON + Mobile", jobs:2, available:"Available 9–11am", exp:"Dec 2028", avatarInitials:"BW", avatarColor:"#0891b2", verified:true },
  { id:"n4", name:"Carla Mendez", rating:360, distance:"2.4 mi away", services:"RON + Mobile", jobs:1, available:"Available 9–11am", exp:"Dec 2028", avatarInitials:"CM", avatarColor:"#059669", verified:true },
];

export const mockJobDetail = {
  id: "AL-9842",

  client: {
    name: "Riverside Legal Services",
    type: "Corporate / Legal",
    contact: "Sarah Mitchell",
    email: "s.mitchell@riverside.legal",
    address: "450 Market St, Ste 1200, San Francisco, CA 94111",
    ref: "REF-8842-X",
  },

  service: {
    name: "Remote Online Notarization",
    signers: ["David Chen", "Elena Rossi"],
    docs: "Mortgage Deed, Affidavit of Title (4 pages)",
    date: "Oct 24, 2023",
    time: "02:30 PM PST",
    state: "California",
    fee: 125,
    meetingLink: "",
  },

  notary: {
    name: "James D. Wilson",
    phone: "(415) 555-0198",
    cert: "CA-NOT-99102 (Exp. DEC 2025)",
    email: "j.wilson@notarydirect.com",
    distance: "3.2 Miles",
    rating: 4.8,
  },
};

export const mockCalendarJobs = [
  {
    id: "AL-9840",
    day: 1, // Monday
    startHour: 8,
    duration: 2,
    customer: "D. Chen",
    type: "Mobile",
  },
  {
    id: "AL-9855",
    day: 3,
    startHour: 9,
    duration: 1,
    customer: "J. Wick",
    type: "RON",
  },
  {
    id: "AL-9846",
    day: 1,
    startHour: 11,
    duration: 1,
    customer: "D. Chen",
    type: "Conflict",
  },
  {
    id: "AL-9857",
    day: 3,
    startHour: 11,
    duration: 2,
    customer: "J. Wick",
    type: "RON",
  },
];