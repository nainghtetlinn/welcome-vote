const Header = ({ id }: { id: string }) => {
  return (
    <header className='p-4 border-b bg-card'>
      <h5 className='text-center text-primary font-bold text-lg'>
        IT Welcome Voter | {id}
      </h5>
    </header>
  )
}

export default Header
