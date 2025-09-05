'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

const NavBar = () => {
    let links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
    const currentPath = usePathname()
  return (
      <nav className='flex items-center p-4 mx-5 space-x-6 h-15 border-b'>
          <Link href='/'><AiFillBug /></Link>
          <ul className='flex items-center space-x-6'>
              {links.map((link) => (
                  <Link
                      key={link.href}
                      href={link.href}
                      className={classnames({
                          'text-gray-500': currentPath !== link.href,
                          'text-gray-900': currentPath === link.href,
                          'hover:text-black transition-colors': true,
                      })}
                      >
                      {link.label}
                  </Link>
              ))}
          </ul>
      </nav>
  );
}

export default NavBar