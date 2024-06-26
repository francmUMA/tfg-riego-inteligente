import "./ui/welcome/background-style.css"
import Footer from "./ui/welcome/Footer";
import NavBar from "./ui/welcome/NavBar";
import Image from "next/image";


export default function Page() {
    return (
        <div className={`flex flex-col h-screen`}>
            <div className="bg-white w-full">
                <NavBar />
            </div>
            <div className="p-6 w-full h-full flex flex-col gap-2 md:flex-row md:justify-center md:items-center">
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <h1 className={`mb-4 text-shadow text-4xl sm:px-8 xl:px-24 font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl`}>
                        Únete a la nueva era de la agricultura
                    </h1>
                    <p className="mt-4 text-slate-100 text-lg font-normal lg:text-xl sm:px-8 xl:px-24">
                        Empieza a ahorrar agua, tiempo y dinero con nuestro sistema de riego autónomo.
                    </p>
                </div>
                <div className="flex justify-center md:justify-end items-center w-2/3 h-full">
                    <Image className="rounded-xl shadow-xl border" src={"/landing_image.png"} alt="" width="450" height="0"></Image>
                </div>
            </div>
            <div className="bg-white">
                <Footer />
            </div>
        </div>
    )
}