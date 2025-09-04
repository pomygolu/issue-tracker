import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Card, Flex, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })

    if (!issue) {
        notFound()
    }
    
  return (
    <div>
    <Heading>{issue.title}</Heading>

    <Flex className='space-x-4' my='2'>    
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toLocaleDateString()}</p>
    </Flex>

    <Card><p>{issue.description}</p></Card>

    </div>
  )
}

export default IssueDetailPage