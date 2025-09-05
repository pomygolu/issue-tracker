'use client'

import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../[id]/edit/loading'
import { Issue } from '@prisma/client'

const IssueForm = dynamic(() => import('./IssueForm'), { 
  ssr: false, 
  loading: () => <IssueFormSkeleton /> 
})

interface Props {
  issue?: Issue
}

const DynamicIssueForm = ({ issue }: Props) => {
  return <IssueForm issue={issue} />
}

export default DynamicIssueForm
