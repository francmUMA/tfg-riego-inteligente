export default function Layout(
  { children }: { children: React.ReactNode}
  ) 
{
  return (
      
      <div className="w-full h-full pl-2">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
  );
}