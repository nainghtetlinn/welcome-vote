import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { updateCookies } from '@/utils/cookie'

export async function middleware(request: NextRequest) {
  const supabaseResponse = await updateSession(request)
  const myNewResponse = await updateCookies(request)

  const supabaseCookies = supabaseResponse.headers.get('Set-Cookie')
  if (supabaseCookies) {
    myNewResponse.headers.append('Set-Cookie', supabaseCookies)
  }

  return myNewResponse
}
