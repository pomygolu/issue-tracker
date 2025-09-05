import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { Issue } from '@prisma/client'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue} : {issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>

    <Flex className='space-x-4' my='2'>    
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toLocaleDateString()}</p>
    </Flex>

    <Card className='prose' mt='4'>
        <ReactMarkdown>{issue.description || 'No description'}</ReactMarkdown>
    </Card>
    </>
  )
}

export default IssueDetails