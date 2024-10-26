import {useCallback, useContext} from "react";
import {AuthContext} from "../AuthContext";
import {useSetAtom} from "jotai";
import {accessTokenAtom} from "../store/accessTokenAtom";

export function useAuth() {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthClient not found in context");
  }

  const signIn = useCallback(async () => {
    const token = await auth.getAccessToken.query({scopes: ["email"]});
    setAccessToken(token);
  }, [auth, setAccessToken]);

  return {auth, signIn};
}
