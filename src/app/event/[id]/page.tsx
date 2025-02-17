import CandidatesCarousel from './_components/candidates-carousel'
import MyVotes from './_components/my-votes'
import SubmitBtn from './_components/submit-btn'

import { filterCandidates } from '@/utils/candidate'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const Vote = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const supabase = await createClient()

  const event = await supabase
    .from('events')
    .select('*, candidates(*)')
    .eq('name', id)
    .eq('active', true)
    .single()

  if (event.error || !event.data) redirect('/error')

  const { males, females } = filterCandidates(event.data.candidates)

  return (
    <>
      <section className='py-4 px-2 mb-4 space-y-2'>
        <h3 className='font-bold text-2xl'>Your Votes</h3>
        <MyVotes />
        <div className='flex justify-end'>
          <SubmitBtn eventId={event.data.id} />
        </div>
      </section>

      <section className='py-4 pl-2 space-y-6'>
        <div>
          <h3 className='font-bold text-2xl mb-2'>Queen / Princess</h3>
          <CandidatesCarousel candidates={females} />
        </div>
        <div>
          <h3 className='font-bold text-2xl mb-2'>King / Prince</h3>
          <CandidatesCarousel candidates={males} />
        </div>
      </section>
    </>
  )
}

export default Vote
