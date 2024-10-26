import {AuthClient} from "@repo/chrome-auth-service";
import {createContext} from "react";

export const AuthContext = createContext<AuthClient | undefined>(undefined);
