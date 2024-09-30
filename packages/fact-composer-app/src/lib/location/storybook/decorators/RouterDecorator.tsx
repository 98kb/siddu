import {MemoryRouter} from "react-router-dom";

export function RouterDecorator({children}: {children: React.ReactNode}) {
  return <MemoryRouter>{children}</MemoryRouter>;
}
