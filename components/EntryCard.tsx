import { JournalEntry } from '@prisma/client'

interface EntryCardProps {
  entry: JournalEntry
}
export default function EntryCard({ entry }: EntryCardProps) {
  return <div>{entry.id}</div>
}
