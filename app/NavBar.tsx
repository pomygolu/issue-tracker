import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    let links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
  return (
    <nav className='flex items-center p-4 mx-5 space-x-6 h-15 border-b'>
        <Link href='/'><AiFillBug /></Link>
    <ul className='flex items-center space-x-6'>
        {links.map((link) => (
            <Link key={link.href} href={link.href} className='text-gray-500 hover:text-black transition-colors'>{link.label}</Link>
        ))}
    </ul>
    </nav>
  )
}

export default NavBar