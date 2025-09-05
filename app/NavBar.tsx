'use client'
import React from 'react'
import Link from 'next/link'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import {useSession} from 'next-auth/react'
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';


const NavBar = () => {
  return (
      <nav className='px-5 mb-5 border-b py-3'>
        <Flex justify='between'> 
            <Flex align='center' gap='4'>
            <Link href='/'><AiFillBug /></Link>
                <NavLinks />
            </Flex>
            <AuthStatus />
        </Flex>
      </nav>
  );
}

const NavLinks = () => {
    let links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' },
    ]
    const currentPath = usePathname()
    return (
        <ul className='flex items-center space-x-6'>
            {links.map((link) => (
                <li key={link.href}>
                <Link
                    
                    href={link.href}
                    className={classnames({
                        'nav-link': true,
                        '!text-gray-900': currentPath === link.href
                    })}
                    >
                    {link.label}
                </Link>
                </li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const {status, data: session} = useSession()
    return (
        <Box>
        {status === "authenticated" && 
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src={session?.user?.image!} fallback='?' size='2' radius='full' className='cursor-pointer' referrerPolicy='no-referrer' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label><Text size='2'>{session?.user?.email}</Text></DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>}
        {status === "unauthenticated" && <Link className='nav-link' href="/api/auth/signin">Sign In</Link>}
      </Box>
    )
}

export default NavBar