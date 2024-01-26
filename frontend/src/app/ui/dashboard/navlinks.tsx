'use client'
import {
  HomeIcon,
  CpuChipIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import { PiPlant } from "react-icons/pi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

class CropIcon extends React.Component {
  render() {
    return <PiPlant size={24} />;
  }
}

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Devices',
    href: '/dashboard/devices',
    icon: CpuChipIcon,
  },
  { name: 'Map', href: '/dashboard/map', icon: MapIcon },
  { name: 'Crops', href: '/dashboard/crop', icon: CropIcon},
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
              ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}