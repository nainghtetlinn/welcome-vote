import Header from './_components/header'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default AdminLayout
