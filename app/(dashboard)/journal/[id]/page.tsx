import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { JournalEntry, Prisma } from '@prisma/client'

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

interface EntryPageProps {
  params: {
    id: string
  }
}
export default async function EntryPage({ params: { id } }: EntryPageProps) {
  const entry = await getEntry(id)

  return (
    <div className="h-full w-full">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
    </div>
  )
}
