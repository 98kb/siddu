import {useAuth} from "~/auth/useAuth";
import {Button} from "~/components/ui/button";

export function SignInButton() {
  const {signIn} = useAuth();
  return <Button onClick={signIn}>Sign In</Button>;
}
