import { useReducer, useEffect } from "react";
import { mockActs } from "../api/mockData";

const actReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_ACT_INFO": return { ...state, ...action.payload };
    case "SET_VENUE": return { ...state, venue: action.payload };
    case "SET_DATE": return { ...state, date: action.payload };
    case "SET_SIGNERS": return { ...state, signers: action.payload };
    case "SET_ACT_TYPE": return { ...state, actType: action.payload };
    case "SET_STATE": return { ...state, state: action.payload };
    case "SET_SEAL_TYPE": return { ...state, sealType: action.payload };
    case "FINALIZE": return { ...state, status: 'finalized' };
    default: return state;
  }
};

const initialState = {
  venue: '',
  date: '',
  signers: [],
  actType: '',
  state: '',
  sealType: 'physical'
};

export const useAct = () => { 
  const [state, dispatch] = useReducer(actReducer, initialState);

  return { state, dispatch };
};
