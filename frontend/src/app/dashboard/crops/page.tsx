'use client';
import { IoIosAddCircleOutline } from "react-icons/io"
import { TbSortAscendingLetters } from "react-icons/tb";
import { RotateIconUpdateButton } from "../../ui/dashboard/RotateIconUpdateButton";
import { useEffect, useState } from "react";
import { getCrops } from "../../lib/cropUtils";
import { AddCropDialog } from "../../ui/dashboard/crop/AddCropDialog";
import { CropCard } from "../../ui/dashboard/crop/CropCard";
import Link from "next/link";
import { notify } from "../../lib/notify";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { checkToken } from "../../lib/token";

export default function Page() {
    const [crops, setCrops] = useState([])

    const [openAddCropDialog, setOpenAddCropDialog] = useState(false)
    const closeAddCropDialog = () => {
        fetchCrops() 
        setOpenAddCropDialog(false) 
    }
    const openAddCropDialogButton = () => setOpenAddCropDialog(true)

    const fetchCrops = async () => {
        let data = await getCrops()
        setCrops(data)
    }
    const router = useRouter()
    useEffect(() => {
        const token = getCookie("token")
        if (token === undefined) {
            notify("Sesión expirada", "error")
            router.push("/login")
        }
        const verify = async (token: string) => {
            let check = await checkToken(token)
            if (!check) {
                notify("Sesión expirada", "error")
                router.push("/login")
            } 
        }
        verify(token as string)
        fetchCrops()
    }, [])

    return (
        <main className="w-full h-full flex flex-col gap-y-2">
            {AddCropDialog(openAddCropDialog, closeAddCropDialog)}
            <header id="botones" className="w-full flex flex-row gap-x-3 justify-start items-center">
                <button onClick={openAddCropDialogButton} className="h-12 w-12 bg-indigo-600 text-white hover:bg-indigo-500 transition ease-in-out duration-150 rounded-md shadow-md border">
                    <IoIosAddCircleOutline size={22} className="w-full flex items-center justify-center"/>
                </button>
                <RotateIconUpdateButton buttonClickFunction={fetchCrops}/>
            </header>
            <section id="cultivos" className="w-full grid grid-cols-3 gap-2 overflow-y-auto">
                {
                    crops.map((crop, index) => {
                        return (
                            <Link className="h-56" href={"/dashboard/crops/elem?id=" + crop.id}>
                                <CropCard crop={crop} key={index}/>
                            </Link>
                        )
                    })
                }
            </section>
        </main>
    )
}