import prisma from '@/prisma/client'
import React from 'react'
import { notFound } from 'next/navigation'
import DynamicIssueForm from '../../_components/DynamicIssueForm'


interface Props {
    params: Promise<{ id: string }>
  }

const EditPage = async ({ params }: Props) => {
    const { id } = await params
    const issue = await prisma.issue.findUnique({
        where: { id }
    })

    if (!issue) notFound();
    
    return (
        <DynamicIssueForm issue={issue} />
  )
}

export default EditPage