import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 h-screen'>
      <h3 className='text-lg'>Opps... Something went wrong.</h3>
      <h1 className='font-bold text-3xl'>Internal Server Error: 500</h1>
      <Button asChild>
        <Link href='/'>Go Home</Link>
      </Button>
    </div>
  )
}

export default Error
