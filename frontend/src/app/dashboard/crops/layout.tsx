import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Layout(
    { children }: { children: React.ReactNode}
    ) 
  {
    return (
        
        <div className="w-full h-full pl-2">
          <div className="w-full h-full">
          <ToastContainer />
            {children}
          </div>
        </div>
    );
  }