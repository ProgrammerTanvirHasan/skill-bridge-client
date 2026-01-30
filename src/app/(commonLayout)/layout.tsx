import Display from "@/components/ui/display";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <Display />
      {children}
    </div>
  );
}
