'use client'
import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from '@clerk/nextjs'
import React from 'react'
import SearchInput from './search-input'
import InviteButton from './invite-button'

export default function Navbar() {
  const { organization } = useOrganization()
  return (
    <nav className='flex items-center gap-x-5 p-5 '>
      <div className='lg:flex-1 hidden lg:flex'>
        <SearchInput />
      </div>
      <div className='lg:hidden block flex-1'>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '376px',
              },
              organizationSwitcherTrigger: {
                padding: '6px ',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                justifyContent: 'space-between',
                backgroundColor: 'white',
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </nav>
  )
}
