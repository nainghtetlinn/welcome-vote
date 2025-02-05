'use client'

import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Loader2, LogOut } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { logout } from '../action'
import { toast } from 'sonner'

const Header = () => {
  const path = usePathname()
  const paths = path.split('/')
  paths.shift()

  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)

    const { error } = await logout()

    if (!error) {
      toast.success('Success')
    } else {
      toast.error(error)
    }

    setLoading(false)
  }

  return (
    <>
      <header className='flex justify-between items-center p-4 border-b'>
        <div className='flex items-center gap-2'>
          <h5 className='text-primary font-bold text-lg'>IT Welcome Voter</h5>
          <Badge>Admin</Badge>
        </div>
        <div>
          <Button
            variant='secondary'
            size='sm'
            disabled={loading}
            onClick={handleClick}
          >
            Logout {loading ? <Loader2 className='animate-spin' /> : <LogOut />}
          </Button>
        </div>
      </header>
      <Breadcrumb className='p-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {paths.map((p, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                {i + 1 !== paths.length ? (
                  <BreadcrumbLink asChild>
                    <Link href={`/${p}`}>{p}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{p}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i + 1 !== paths.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

export default Header
