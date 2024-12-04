import {IAuthService} from "@repo/chrome-auth-service";
import {createContext} from "react";

export const AuthContext = createContext<IAuthService | undefined>(undefined);
