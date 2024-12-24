import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import Link from 'next/link'
import Profile from '@/components/profile'

const Event = ({
  event,
}: {
  event: { created_at: string; id: number; status: boolean; title: string }
}) => {
  return (
    <Link href={`/admin/event/${event.id}`}>
      <Card className='hover:border-primary'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>{event.title}</span>{' '}
            {event.status ? (
              <Badge>Active</Badge>
            ) : (
              <Badge variant='secondary'>Inactive</Badge>
            )}
          </CardTitle>
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

export default Event
