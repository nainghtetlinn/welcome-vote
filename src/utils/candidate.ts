import { Tables } from '@/types/supabase'

type TCandidates = Tables<'candidates'>[]

export const filterCandidates = (
  candidates: TCandidates
): { males: TCandidates; females: TCandidates } => {
  const males: TCandidates = []
  const females: TCandidates = []

  candidates.forEach(c => {
    if (c.gender == 'male') males.push(c)
    else females.push(c)
  })

  return { males, females }
}
