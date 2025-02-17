import { CircleX } from 'lucide-react'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Error = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg'></div>
      <div className='flex flex-col items-center gap-4 bg-white rounded-lg p-12 w-[300px] text-center'>
        <CircleX
          size={100}
          className='text-red-500'
        />
        <h1 className='font-bold text-3xl'>Opps!</h1>
        <h5>Something went wrong.</h5>
        <Button asChild>
          <Link href='/'>Go Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default Error
