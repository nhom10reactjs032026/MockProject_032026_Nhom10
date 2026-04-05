export type SealType = "physical" | "electronic";

export interface ActState {
  venue: string;
  date: string;
  signers: string[];
  sealType: SealType;
  status: "draft" | "locked";
  actType: string;
  state: string;
}

export const initialActState: ActState = {
  venue: "",
  date: "",
  signers: [],
  sealType: "physical",
  status: "draft",
  actType: "",
  state: "",
};

export type ActAction =
  | { type: "SET_VENUE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_SIGNERS"; payload: string[] }
  | { type: "SET_SEAL_TYPE"; payload: SealType }
  | { type: "SET_ACT_TYPE"; payload: string }
  | { type: "SET_STATE"; payload: string }
  | { type: "LOCK_RECORD" };

export function actReducer(state: ActState, action: ActAction): ActState {
  switch (action.type) {
    case "SET_VENUE":
      return { ...state, venue: action.payload };

    case "SET_DATE":
      return { ...state, date: action.payload };

    case "SET_SIGNERS":
      return { ...state, signers: action.payload };

    case "SET_SEAL_TYPE":
      return { ...state, sealType: action.payload };
    case "SET_ACT_TYPE":
      return { ...state, actType: action.payload };

    case "SET_STATE":
      return { ...state, state: action.payload };
      
    case "LOCK_RECORD":
      return { ...state, status: "locked" };

    default:
      return state;
  }
}
