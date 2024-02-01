import SideNav from "../ui/dashboard/sideNav";

export default function Layout(
  { children }: { children: React.ReactNode}
  ) 
{
  return (
      
      <div className="flex bg-white h-screen flex-col md:flex-row md_overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="h-full w-full">
          {children}
        </div>
      </div>
  );
}