import prisma from '@/prisma/client'
import React from 'react'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IssueForm = dynamic(() => import('../../_components/IssueForm'), { ssr: false, loading: () => <IssueFormSkeleton /> })


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
        <IssueForm issue={issue} />
  )
}

export default EditPage