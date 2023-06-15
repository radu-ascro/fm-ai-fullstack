import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import Question from '@/components/Question'

import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const data = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return data
}

const JournalPage = async () => {
  const data = await getEntries()
  return (
    <div className="h-full bg-zinc-100/50 px-6 py-8">
      <h1 className="mb-12 text-4xl">Journals</h1>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {data.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
