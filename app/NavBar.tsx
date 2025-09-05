'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import {useSession} from 'next-auth/react'
import { Box } from '@radix-ui/themes';

const NavBar = () => {
    let links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
    const currentPath = usePathname()
    const {status, data: session} = useSession()
  return (
      <nav className='flex items-center p-4 mx-5 space-x-6 h-15 border-b'>
          <Link href='/'><AiFillBug /></Link>
          <ul className='flex items-center space-x-6'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                      
                      href={link.href}
                      className={classnames({
                          'text-gray-500': currentPath !== link.href,
                          'text-gray-900': currentPath === link.href,
                          'hover:text-black transition-colors': true,
                      })}
                      >
                      {link.label}
                  </Link>
                  </li>
              ))}
          </ul>
          <Box>
            {status === "authenticated" && <Link href="/api/auth/signout">Sign Out</Link>}
            {status === "unauthenticated" && <Link href="/api/auth/signin">Sign In</Link>}
          </Box>
      </nav>
  );
}

export default NavBar