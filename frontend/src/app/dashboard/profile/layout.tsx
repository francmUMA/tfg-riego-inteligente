import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Layout(
  { children }: { children: React.ReactNode}
  ) 
{
  return (
      
      <div className="flex h-full w-full flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow w-full h-full md:overflow-y-auto ">
        <ToastContainer />
          {children}
        </div>
      </div>
  );
}