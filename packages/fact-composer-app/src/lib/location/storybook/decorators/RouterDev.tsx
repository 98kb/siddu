import {useLocation} from "react-router-dom";

export function RouterDev() {
  const location = useLocation();
  return <kbd className="absolute top-0 right-0 mr-5">{location.pathname}</kbd>;
}
