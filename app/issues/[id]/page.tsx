import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import { Box, Flex, Grid } from '@radix-ui/themes'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import IssueDeleteButton from './IssueDeleteButton'

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
    <Grid columns={{initial: '1', sm: '5'}}>
    <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
    </Box>

    <Box>
        <Flex direction='column' gap='4'>
            <EditButton issueId={issue.id} />
            <IssueDeleteButton issueId={issue.id} />
        </Flex>
    </Box>
    </Grid>
  )
}

export default IssueDetailPage