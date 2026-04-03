import { createContext, useReducer, type ReactNode } from "react";
import { actReducer, initialActState, type ActState, type ActAction } from "./actReducers";

interface ActContextType {
    state: ActState;
    dispatch: React.Dispatch<ActAction>;
}

export const ActContext = createContext<ActContextType | null>(null);

export const ActProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(actReducer, initialActState);

    return (
        <ActContext.Provider value={{ state, dispatch }}>
            {children}
        </ActContext.Provider>
    );
};