import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import Profile from '@/components/profile'
import ResultChart from './_components/result-chart'
import AddNewCandidate from './_components/add-new-candidate'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single()

  if (!data) redirect('/admin')

  return (
    <div className='p-4'>
      <header className='flex items-center justify-center gap-4 mb-8'>
        <h2 className='text-2xl font-bold underline'>{data.title}</h2>
        {data.status ? (
          <Badge>Active</Badge>
        ) : (
          <Badge variant='secondary'>Inactive</Badge>
        )}
        <Switch checked={data.status} />
      </header>

      <section className='max-w-[400] mx-auto flex items-center justify-evenly mb-8'>
        <Profile name='King' />
        <Profile name='Queen' />
        <Profile name='Prince' />
        <Profile name='Princess' />
      </section>

      <h3 className='font-bold text-lg mb-4'>Candidates</h3>
      <section className='flex flex-wrap gap-2 mb-8'>
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <Profile name='King' />
        <AddNewCandidate />
      </section>

      <h3 className='font-bold text-lg mb-4'>Result Chart</h3>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <ResultChart />
        <ResultChart />
        <ResultChart />
        <ResultChart />
      </section>
    </div>
  )
}

export default EventDetails
