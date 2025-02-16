import ProfileImage from '@/assets/profile.png'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import VoteBtn from './vote-btn'

import { Tables } from '@/types/supabase'
import Image from 'next/image'

const CandidatesCarousel = ({
  candidates,
}: {
  candidates: Tables<'candidates'>[]
}) => {
  return (
    <Carousel className='w-full'>
      <CarouselContent className='py-2'>
        {candidates.map(c => (
          <CarouselItem
            key={c.id}
            className='basis-[300px]'
          >
            <CandidateItem candidate={c} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-2 bg-primary text-primary-foreground' />
      <CarouselNext className='right-4 bg-primary text-primary-foreground' />
    </Carousel>
  )
}

const CandidateItem = ({ candidate }: { candidate: Tables<'candidates'> }) => {
  return (
    <Card>
      <CardHeader className='select-none'>
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription>{candidate.roll_no}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='w-full aspect-square rounded-md overflow-hidden'>
          {candidate.photo_url ? (
            <Image
              src={candidate.photo_url}
              alt={candidate.name}
              width={200}
              height={200}
              className='w-full h-full object-cover'
            />
          ) : (
            <Image
              src={ProfileImage}
              alt={candidate.name}
              width={200}
              height={200}
              className='w-full h-full object-cover'
            />
          )}
        </div>
      </CardContent>
      <CardFooter className='gap-2'>
        <VoteBtn
          category={candidate.gender === 'male' ? 'king' : 'queen'}
          candidate={candidate}
        />
        <VoteBtn
          category={candidate.gender === 'male' ? 'prince' : 'princess'}
          candidate={candidate}
        />
      </CardFooter>
    </Card>
  )
}

export default CandidatesCarousel
