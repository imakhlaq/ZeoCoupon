import { ReactNode } from "react";
import NavBar from "./_components/NavBar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    //selection is special tailwind class for when user select the text on the screen with mouse
    <div className="selection:bg-[hsl(320,65%,52%,20%)]">
      <NavBar />
      {children}
    </div>
  );
}
