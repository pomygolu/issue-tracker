'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import {useSession} from 'next-auth/react'
import { Box, Flex } from '@radix-ui/themes';

const NavBar = () => {
    let links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
    const currentPath = usePathname()
    const {status, data: session} = useSession()
  return (
      <nav className='px-5 mb-5 border-b py-3'>
        <Flex justify='between'> 
            <Flex align='center' gap='4'>
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
            </Flex>
            <Box>
            {status === "authenticated" && <Link href="/api/auth/signout">Sign Out</Link>}
            {status === "unauthenticated" && <Link href="/api/auth/signin">Sign In</Link>}
          </Box>
        </Flex>
      </nav>
  );
}

export default NavBar