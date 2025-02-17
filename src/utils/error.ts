import { ErrorResponse } from '@/types/error'

export function createError(error: any, message?: string): ErrorResponse {
  console.log('Supabase error:', error)
  return { success: false, message: message || 'Something went wrong' }
}
