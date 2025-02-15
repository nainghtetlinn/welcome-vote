export function createError(error: any) {
  console.log('Supabase error:', error)
  return { success: false, message: 'Something went wrong', error }
}
