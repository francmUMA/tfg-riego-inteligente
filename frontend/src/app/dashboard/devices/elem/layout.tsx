export default function Layout(
    { children }: { children: React.ReactNode}
    ) 
  {
    return (
        
        <div className="w-full h-full overflow-y-scroll">
            {children}
        </div>
    );
  }