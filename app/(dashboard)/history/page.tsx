import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)

  return { analyses, avg }
}

export default async function History() {
  const { analyses, avg } = await getData()
  console.log(analyses)
  return (
    <div className="h-full w-full">
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}
