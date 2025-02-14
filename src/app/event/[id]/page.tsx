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

  const [males, females] = filterCandidates(event.data.candidates)

  return (
    <>
      <section className='border-b py-4 px-2 mb-4 space-y-2'>
        <h3 className='font-bold text-xl'>
          Your <span className='text-primary text-2xl underline'>Votes</span>
        </h3>
        <MyVotes />
        <div className='flex justify-end'>
          <SubmitBtn eventId={event.data.id} />
        </div>
      </section>

      <section className='py-4 pl-2 space-y-6'>
        <div>
          <h3 className='font-bold text-xl mb-2'>
            Candidates for{' '}
            <span className='text-primary text-2xl underline'>King</span>
          </h3>
          <CandidatesCarousel
            category='king'
            candidates={males}
          />
        </div>

        <div>
          <h3 className='font-bold text-xl mb-2'>
            Candidates for{' '}
            <span className='text-primary text-2xl underline'>Queen</span>
          </h3>
          <CandidatesCarousel
            category='queen'
            candidates={females}
          />
        </div>

        <div>
          <h3 className='font-bold text-xl mb-2'>
            Candidates for{' '}
            <span className='text-primary text-2xl underline'>Prince</span>
          </h3>
          <CandidatesCarousel
            category='prince'
            candidates={males}
          />
        </div>

        <div>
          <h3 className='font-bold text-xl mb-2'>
            Candidates for{' '}
            <span className='text-primary text-2xl underline'>Princess</span>
          </h3>
          <CandidatesCarousel
            category='princess'
            candidates={females}
          />
        </div>
      </section>
    </>
  )
}

export default Vote
