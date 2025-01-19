import CreateCandidateBtn from './_components/create-candidate-btn'
import Header from './_components/header'
import Profile from './_components/profile'
import ResultChart from './_components/result-chart'

import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const supabase = await createClient()

  const eventResult = await supabase
    .from('events')
    .select()
    .eq('id', id)
    .single()

  const candidateResults = await supabase
    .from('candidates')
    .select()
    .eq('event_id', id)

  const votingResults = await supabase
    .from('voting_results')
    .select()
    .eq('event_id', id)

  if (eventResult.error || candidateResults.error || votingResults.error)
    redirect('/error')

  if (!eventResult.data || !candidateResults.data || !votingResults.data)
    redirect('/admin')

  const grouped = votingResults.data.reduce<{
    king: Tables<'voting_results'>[]
    queen: Tables<'voting_results'>[]
    prince: Tables<'voting_results'>[]
    princess: Tables<'voting_results'>[]
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
      <Header event={eventResult.data} />

      <h3 className='font-bold text-lg mb-4'>Candidates</h3>
      <section className='flex flex-wrap gap-2 mb-8'>
        {candidateResults.data.map(c => (
          <Profile
            candidate={c}
            key={c.id}
          />
        ))}
        <CreateCandidateBtn />
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
