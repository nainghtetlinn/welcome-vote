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

type TCandidates = Tables<'candidates'>[]

const CandidatesCarousel = ({
  candidates,
  category,
}: {
  candidates: TCandidates
  category: string
}) => {
  return (
    <Carousel className='w-full'>
      <CarouselContent>
        {candidates.map(c => (
          <CarouselItem
            key={c.id}
            className='basis-[300px]'
          >
            <Card>
              <CardHeader>
                <CardTitle>{c.name}</CardTitle>
                <CardDescription>{c.roll_no}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='w-full aspect-square rounded-md overflow-hidden'>
                  {c.photo_url ? (
                    <Image
                      src={c.photo_url}
                      alt={c.name}
                      width={200}
                      height={200}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <Image
                      src={ProfileImage}
                      alt={c.name}
                      width={200}
                      height={200}
                      className='w-full h-full object-cover'
                    />
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <VoteBtn
                  category={category}
                  candidate={c}
                />
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-2 bg-primary text-primary-foreground' />
      <CarouselNext className='right-4 bg-primary text-primary-foreground' />
    </Carousel>
  )
}

export default CandidatesCarousel
