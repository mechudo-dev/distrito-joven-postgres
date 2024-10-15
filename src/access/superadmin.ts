import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const superadmin: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user && user.role === 'superadmin')
}
