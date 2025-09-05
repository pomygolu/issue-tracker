import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Box, Grid } from '@radix-ui/themes'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'

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
    <Grid columns={{initial: '1', md: '2'}}>
    <Box>
        <IssueDetails issue={issue} />
    </Box>

    <Box>
        <EditButton issueId={issue.id} />
    </Box>
    </Grid>
  )
}

export default IssueDetailPage