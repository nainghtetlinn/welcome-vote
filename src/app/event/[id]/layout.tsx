import Header from './_components/header'

const EventLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return (
    <main className='container mx-auto max-w-screen-lg'>
      <Header id={id} />
      {children}
    </main>
  )
}

export default EventLayout
