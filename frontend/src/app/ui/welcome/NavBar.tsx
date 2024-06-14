'use client'
import { useState } from 'react'
import Image from 'next/image'
import { IoReorderThree } from "react-icons/io5"

const navigation = [
    { title: "Tecnología", path: "" },
    { title: "Sobre nosotros", path: "" },
    { title: "Contacto", path: "" },
]

const DropdownMenu = () => {
    // Estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
  
    // Función para alternar el estado del menú
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className='h-full w-full'>
        {/* Botón para abrir/cerrar el menú */}
        <button onClick={toggleMenu} className='mr-4 flex justify-center items-center'>
            <IoReorderThree size={33} />
        </button>
        {/* El contenido del menú, que aparecerá cuando isOpen sea true */}
        {isOpen && (
          <ul className="w-32 rounded-md shadow-md overflow-hidden" style={{
            backgroundColor: 'white',
            right: '0',
            top: '50px',
            position: 'absolute',
          }}>
            {
                navigation.map((item
                    
                ) => {
                    return (
                        <a href={item.path} className='h-10 w-full flex justify-center items-center hover:bg-gray-100 duration-100 transition ease-in-out rounded-md'>
                            { item.title }
                        </a>
                    )
                })
            }
            <a href='/login' className='h-10 w-full flex justify-center items-center
             hover:bg-gray-50 duration-100 transition ease-in-out'>
                Inicia Sesión
            </a>
            <a href='/register' className='h-10 w-full flex justify-center items-center bg-indigo-600 text-white hover:bg-indigo-400 duration-100 transition ease-in-out'>
                Regístrate
            </a>
          </ul>
        )}
      </div>
    );
  }

export default () => {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) path with your path

    return (
        <nav className="w-full border-b md:border-0 max-h-20">
            <div className="items-center w-full max-h-20 flex flex-row md:px-8">
                <div className="flex w-full max-h-20 items-center justify-start md:py-5">
                    <Image src="/logo.png" alt="" width="80" height="0" />
                    <h1 className="text-xl">WORM-E</h1>
                </div>
                <div className={`flex flex-row w-full items-center justify-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                        <a href={item.path}>
                                            { item.title }
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='w-full h-full flex flex-row items-center justify-end gap-x-2'>
                    <div className="hidden md:min-w-fit md:flex md:items-center">
                        <a href="/login" className="py-3 px-4 duration-150 transition ease-in-out
                         text-indigo-600 border hover:bg-gray-50 rounded-md shadow-md">
                            Inicia Sesión
                        </a>
                    </div>
                    <div className="hidden md:min-w-fit md:flex md:items-center">
                        <a href="/register" className="py-3 px-4 duration-150 transition ease-in-out
                         text-white bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-md">
                            Regístrate
                        </a>
                    </div>
                    <div className='md:hidden h-full'>
                        <DropdownMenu />
                    </div>
                </div>
            </div>
      </nav>
  )
}