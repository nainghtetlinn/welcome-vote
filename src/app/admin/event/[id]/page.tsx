import Profile from '@/components/profile'
import AddNewCandidate from './_components/add-new-candidate'
import Header from './_components/header'
import ResultChart from './_components/result-chart'

import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

type TResult = Tables<'voting_results'>

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const supabase = await createClient()

  const events = await supabase.from('events').select().eq('id', id).single()

  const candidates = await supabase
    .from('candidates')
    .select()
    .eq('event_id', id)

  const votingResults = await supabase
    .from('voting_results')
    .select()
    .eq('event_id', id)

  if (!events.data || !candidates.data || !votingResults.data)
    redirect('/admin')

  const grouped = votingResults.data.reduce<{
    king: TResult[]
    queen: TResult[]
    prince: TResult[]
    princess: TResult[]
  }>(
    (g, c) => {
      if (c.category_id == 1) g.king.push(c)
      else if (c.category_id == 2) g.queen.push(c)
      else if (c.category_id == 3) g.prince.push(c)
      else if (c.category_id == 4) g.princess.push(c)

      return g
    },
    { king: [], queen: [], prince: [], princess: [] }
  )

  return (
    <div className='p-4'>
      <Header
        id={events.data.id}
        title={events.data.name}
        status={events.data.active}
      />

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
        <ResultChart
          title='King'
          candidates={grouped.king}
        />
        <ResultChart
          title='Queen'
          candidates={grouped.queen}
        />
        <ResultChart
          title='Prince'
          candidates={grouped.prince}
        />
        <ResultChart
          title='Princess'
          candidates={grouped.princess}
        />
      </section>
    </div>
  )
}

export default EventDetails
