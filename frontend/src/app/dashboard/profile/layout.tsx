export default function Layout(
  { children }: { children: React.ReactNode}
  ) 
{
  return (
      
      <div className="flex h-full w-full flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow w-full h-full md:overflow-y-auto ">
          {children}
        </div>
      </div>
  );
}