import Footer from "./ui/welcome/Footer";
import NavBar from "./ui/welcome/NavBar";
import Image from "next/image";

export default function Page() {
    return (
        <main className="grid grid-rows-3 grid-cols-2 gap-3 w-full h-full ">
            <div className="col-span-2 bg-red-50">01</div>
            <div className="bg-red-50">02</div>
            <div className="bg-red-50">03</div>
            <div className="col-span-2 bg-red-50">04</div>
        </main>
        
    )
}