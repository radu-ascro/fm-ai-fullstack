import { auth } from '@clerk/nextjs'
import { prisma } from './db'
import { Prisma } from '@prisma/client'

interface GetUserByClerkIDProps {
  select?: Prisma.UserSelect | null | undefined
}

export const getUserByClerkID = async ({
  select = { id: true },
}: GetUserByClerkIDProps = {}) => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    select,
  })

  return user as Prisma.UserGetPayload<typeof user>
}
