import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const Profile = ({ name, src }: { name: string; src?: string }) => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <Avatar>
        <AvatarImage
          src={src}
          alt={name}
        />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <h6 className='text-xs'>{name}</h6>
    </div>
  )
}

export default Profile
