'use client'
import Link from 'next/link';
import NavLinks from './navlinks';
import Image from 'next/image';
import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { lusitana } from '../fonts';
import { setCookie } from 'cookies-next';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40" >
        <div className="w-32 text-white md:w-40">
            <div className='flex justify-center items-center'>
                <Image src="/logo.png" alt="" width="100" height="0"></Image>
            </div>
            <div className='flex justify-center items-center'>
                <h1 className={`${lusitana.className} antialiased text-[33px]`}>AquaMind</h1>
            </div>
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <Link 
            href="/dashboard/profile"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <UserIcon className="w-6" />
            <div className="hidden md:block">Profile</div>
          </Link>
          <Link 
            href="/" onClick={() => setCookie('token', "", { expires: new Date(0) })}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </Link>
      </div>
    </div>
  );
}