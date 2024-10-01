import {MemoryRouter} from "react-router-dom";
import {RouterDev} from "./RouterDev";

export function RouterDecorator({children}: {children: React.ReactNode}) {
  return (
    <MemoryRouter>
      {children}
      <RouterDev />
    </MemoryRouter>
  );
}
