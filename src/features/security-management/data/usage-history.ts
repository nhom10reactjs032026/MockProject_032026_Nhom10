export type UsageFlag = "none" | "red" | "yellow" | "both";
export type UsageActType = "All" | "Acknowledgement" | "Jurats" | "Copy Certification";

export type UsageRow = {
  id: number;
  dateTime: string;   // text hiển thị
  dateISO: string;    // YYYY-MM-DD để filter
  actId: string;
  docRef: string;
  notary: string;
  flag: UsageFlag;
  outsideWorkingHours: boolean;
  afterExpiration: boolean;
  actType: UsageActType;
};

export const USAGE_ROWS: UsageRow[] = [
  {
    id: 1,
    dateTime: "Oct 18, 2023 | 10:00",
    dateISO: "2023-10-18",
    actId: "NA_1991",
    docRef: "Docs_Ref_#A_100.pdf",
    notary: "John Smith",
    flag: "red",
    outsideWorkingHours: true,
    afterExpiration: false,
    actType: "Acknowledgement",
  },
  {
    id: 2,
    dateTime: "Oct 18, 2023 | 22:15",
    dateISO: "2023-10-18",
    actId: "NA_1991",
    docRef: "Docs_Ref_#A_101.pdf",
    notary: "Mary Ellis",
    flag: "yellow",
    outsideWorkingHours: false,
    afterExpiration: true,
    actType: "Jurats",
  },
  {
    id: 3,
    dateTime: "Oct 19, 2023 | 01:05",
    dateISO: "2023-10-19",
    actId: "NA_1992",
    docRef: "Docs_Ref_#A_102.pdf",
    notary: "Alice Wong",
    flag: "both",
    outsideWorkingHours: true,
    afterExpiration: true,
    actType: "Copy Certification",
  },
  {
    id: 4,
    dateTime: "Oct 20, 2023 | 09:30",
    dateISO: "2023-10-20",
    actId: "NA_1993",
    docRef: "Docs_Ref_#A_103.pdf",
    notary: "Charles Reed",
    flag: "red",
    outsideWorkingHours: true,
    afterExpiration: false,
    actType: "Acknowledgement",
  },
  {
    id: 5,
    dateTime: "Oct 21, 2023 | 11:00",
    dateISO: "2023-10-21",
    actId: "NA_1994",
    docRef: "Docs_Ref_#A_104.pdf",
    notary: "Linda White",
    flag: "none",
    outsideWorkingHours: false,
    afterExpiration: false,
    actType: "Jurats",
  },
];