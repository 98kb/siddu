import {FactsGridPlaceholderIllustration} from "./FactsGridPlaceholderIllustration";

type TProps = {
  children?: React.ReactNode;
};

export function FactsGridPlaceholder({children}: TProps) {
  return (
    <div className="@container w-full h-full flex flex-col justify-center items-center">
      <FactsGridPlaceholderIllustration className="w-2/4 transition-transform" />
      {children}
    </div>
  );
}
