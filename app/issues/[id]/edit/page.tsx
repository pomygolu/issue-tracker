import prisma from '@/prisma/client'
import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { notFound } from 'next/navigation'


interface Props {
    params: { id: string }
  }

const EditPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })

    if (!issue) notFound();
    
    return (
        <IssueForm issue={issue} />
  )
}

export default EditPage