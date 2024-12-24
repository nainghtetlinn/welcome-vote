import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

const Profile = ({ name }: { name: string }) => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <Avatar>
        <AvatarImage
          src='https://github.com/shadcn.png'
          alt={name}
        />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <h6 className='text-xs'>{name}</h6>
    </div>
  )
}

export default Profile
