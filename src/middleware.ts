import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { updateCookies } from '@/utils/cookie'

export async function middleware(request: NextRequest) {
  const myNewResponse = await updateCookies(request)
  const supabaseResponse = await updateSession(request)

  const myCookies = myNewResponse.headers.get('Set-Cookie')
  if (myCookies) {
    supabaseResponse.headers.append('Set-Cookie', myCookies)
  }

  return supabaseResponse
}
