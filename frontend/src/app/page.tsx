import "./ui/welcome/background-style.css"
import Footer from "./ui/welcome/Footer";
import NavBar from "./ui/welcome/NavBar";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-white">
                <NavBar />
            </div>
            <div className="mx-6 flex-grow md:flex md:gap-4 md:justify-center md:items-center">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className={`mb-4 text-shadow text-4xl text-center font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl`}>
                        Empieza a ahorrar agua y dinero    
                    </h1>
                    <p className="mt-4 text-slate-100 text-lg font-normal text-gray-500 lg:text-xl sm:px-8 xl:px-24">
                        Utiliza nuestra IA para gestionar el agua de tus riegos y gestiónalo desde cualquier lugar.
                        Con nuestra IA podrás ahorrar hasta un 30% de agua y dinero.
                    </p>
                </div>
                <div className="flex justify-center items-center w-full h-full">
                    <Image className="rounded-xl shadow-xl border" src={"/landing_image.png"} alt="" width="450" height="0"></Image>
                </div>
            </div>
            
            <div className="bg-white">
                <Footer />
            </div>
        </div>
    )
}