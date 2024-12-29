import Profile from '@/components/profile'
import ResultChart from './_components/result-chart'
import AddNewCandidate from './_components/add-new-candidate'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Header from './_components/header'

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const supabase = await createClient()

  const events = await supabase.from('events').select().eq('id', id).single()

  if (!events.data) redirect('/admin')

  const candidates = await supabase
    .from('candidates')
    .select()
    .eq('event_id', id)

  return (
    <div className='p-4'>
      <Header
        id={events.data.id}
        title={events.data.name}
        status={events.data.active}
      />

      <section className='max-w-[400] mx-auto flex items-center justify-evenly mb-8'>
        <Profile name='King' />
        <Profile name='Queen' />
        <Profile name='Prince' />
        <Profile name='Princess' />
      </section>

      <h3 className='font-bold text-lg mb-4'>Candidates</h3>
      <section className='flex flex-wrap gap-2 mb-8'>
        {candidates.data?.map(c => (
          <Profile
            name={c.name}
            src={c.photo_url!}
            key={c.id}
          />
        ))}
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
