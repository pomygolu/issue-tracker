import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Box, Grid } from '@radix-ui/themes'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: Promise<{ id: string }>
}

const IssueDetailPage = async ({params}: Props) => {
    const { id } = await params
    const issue = await prisma.issue.findUnique({
        where: { id }
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