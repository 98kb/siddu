// import {useAccessToken} from "~/auth/hooks/useAccessToken";
// import {SignInButton} from "../features/SignInButton";
// import {useEffect} from "react";
// import {useAuth} from "~/auth/hooks/useAuth";
import {useBackup} from "~/db/hooks/useBackup";
import {Button} from "~/components/ui/button";

export function AccountPage() {
  // const {signIn} = useAuth();
  // const token = useAccessToken();
  const backup = useBackup();
  return (
    <>
      <Button onClick={() => backup?.backup.mutate()}>Backup</Button>;
      <Button onClick={() => backup?.restore.mutate()}>Restore</Button>;
    </>
  );
  // useEffect(() => {
  //   signIn();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // return <div>{token ?? <SignInButton />}</div>;
}
