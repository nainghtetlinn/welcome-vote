import type { Metadata } from 'next'
import Header from './_components/header'

export const metadata: Metadata = {
  title: 'Admin',
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='container mx-auto max-w-screen-lg'>
      <Header />
      {children}
    </main>
  )
}

export default AdminLayout
