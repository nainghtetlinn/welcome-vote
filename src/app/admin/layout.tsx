import Header from './_components/header'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='container mx-auto max-w-screen-lg'>
      <Header />
      {children}
    </main>
  )
}

export default AdminLayout
