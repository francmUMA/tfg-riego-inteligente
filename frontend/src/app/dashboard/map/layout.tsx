export default function Layout(
    { children }: { children: React.ReactNode}
    ) 
  {
    return (
      <div className="w-full h-full">
        <div className="w-full h-full p-3">
          {children}
        </div>
    </div>
    );
  }