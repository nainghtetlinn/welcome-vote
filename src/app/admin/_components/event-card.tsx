import Profile from '@/components/profile'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Tables } from '@/types/supabase'
import Link from 'next/link'

const EventCard = ({
  event,
}: {
  event: Tables<'events'> & { candidates_count: number; votes_count: number }
}) => {
  return (
    <Link href={`/admin/event/${event.id}`}>
      <Card className='hover:border-primary'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{event.name}</span>
            {event.active ? (
              <Badge>Active</Badge>
            ) : (
              <Badge variant='secondary'>Inactive</Badge>
            )}
          </CardTitle>
          <CardDescription>
            {event.candidates_count} candidates | {event.votes_count} voters
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-evenly'>
          <Profile name='King' />
          <Profile name='Queen' />
          <Profile name='Prince' />
          <Profile name='Princess' />
        </CardContent>
      </Card>
    </Link>
  )
}

export default EventCard
