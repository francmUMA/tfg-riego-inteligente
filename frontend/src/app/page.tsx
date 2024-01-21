import Footer from "./ui/welcome/Footer";
import NavBar from "./ui/welcome/NavBar";
import Image from "next/image";

export default function Page() {
    return (
        <main className="w-full h-screen bg-white">
            <NavBar />
            <div className="flex justify-center items-center">
                <h1 className="text-3xl font-mono w-full h-full mx-12">Empieza a ahorrar agua con nuestro sistema de gestión del riego</h1>
                <Image className="w-full" src="/welcome_img.jpg" alt="" width="600" height="700"/>
            </div>
            <div className="flex justify-center">
                <Footer />
            </div>
            
        </main>
        
    )
}