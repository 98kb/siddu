import {useAccessToken} from "~/auth/hooks/useAccessToken";
import {SignInButton} from "../features/SignInButton";
import {useEffect} from "react";
import {useAuth} from "~/auth/hooks/useAuth";

export function AccountPage() {
  const {signIn} = useAuth();
  const token = useAccessToken();
  useEffect(() => {
    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{token ?? <SignInButton />}</div>;
}
