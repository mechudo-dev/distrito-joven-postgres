import Link from 'next/link'

const UserName = async ({ payload }) => {

  const users = await payload.find({
    collection: 'users',
  })

  return (
    <Link href='/admin/account'>
      <p style={{ width: '100%' }}>{users.docs[1]?.name}</p>
    </Link>
  )
}

export default UserName