'use client'
import { useState } from 'react'
import Image from 'next/image'

export default () => {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Technology", path: "" },
        { title: "About", path: "" },
        { title: "Contact", path: "" },
    ]

    return (
        <nav className="bg-white w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-center md:py-5">
                    <Image src="/logo.png" alt="" width="80" height="0" />
                    <h1 className="font-sans text-xl">AquaMind</h1>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
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
                <div className="hidden md:inline-block">
                    <a href="/register" className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                        Sign Up
                    </a>
                </div>
            </div>
      </nav>
  )
}