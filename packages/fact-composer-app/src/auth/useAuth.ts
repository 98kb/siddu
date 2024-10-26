import {useCallback, useContext} from "react";
import {AuthContext} from "./AuthContext";

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthClient not found in context");
  }

  const getAccessToken = useCallback(
    () => auth.getAccessToken.query({scopes: ["email"]}),
    [auth],
  );

  return {auth, signIn: getAccessToken};
}
