import { Navbar } from "@/components/navbar";
import Display from "@/components/ui/display";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto ">
      <Navbar></Navbar>
      <Display></Display>
      {children}
    </div>
  );
}
