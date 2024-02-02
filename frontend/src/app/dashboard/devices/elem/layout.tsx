export default function Layout(
    { children }: { children: React.ReactNode}
    ) 
  {
    return (
        
        <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
          <div className="flex-grow px-4 md:overflow-y-auto">
            {children}
          </div>
        </div>
    );
  }