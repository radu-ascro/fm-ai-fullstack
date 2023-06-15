import Editor from '@/components/Editor'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
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
      <Editor entry={entry} />
    </div>
  )
}
