import SideNav from "../ui/dashboard/sideNav"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Layout(
  { children }: { children: React.ReactNode}
  ) 
{
  return (
      
      <div className="flex bg-white h-screen flex-col md:flex-row">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="h-full w-full overflow-y-auto py-4 pr-2">
          <ToastContainer />
          {children}
        </div>
      </div>
  );
}