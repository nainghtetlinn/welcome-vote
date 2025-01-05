'use server'

import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuid } from 'uuid'

export const updateCookies = async (request: NextRequest) => {
  const response = NextResponse.next({ request })

  const token = request.cookies.get('session_token')

  if (!token) {
    response.cookies.set('session_token', uuid(), {})
  }

  return response
}
