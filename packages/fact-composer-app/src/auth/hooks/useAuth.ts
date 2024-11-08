import {useCallback, useContext} from "react";
import {AuthContext} from "../AuthContext";
import {useAtom} from "jotai";
import {accessTokenAtom} from "../store/accessTokenAtom";

export function useAuth() {
  const [token, setAccessToken] = useAtom(accessTokenAtom);
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthClient not found in context");
  }

  const signIn = useCallback(async () => {
    const token = await auth.getAccessToken();
    setAccessToken(token);
  }, [auth, setAccessToken]);

  const signOut = useCallback(async () => {
    if (token) {
      await auth.clearAccessToken({token});
      setAccessToken(undefined);
    }
  }, [auth, setAccessToken, token]);

  return {auth, signIn, signOut};
}
