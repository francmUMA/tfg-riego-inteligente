export default function Layout(
    { children }: { children: React.ReactNode}
    ) 
  {
    return (
        
        <div className="w-full h-full">
          <div className="w-full h-full">
            {children}
          </div>
        </div>
    );
  }