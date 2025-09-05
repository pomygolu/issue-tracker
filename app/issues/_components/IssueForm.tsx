'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod'
import { IssueSchema } from '@/app/createIssueSchema'
import { z } from 'zod'
import { Text } from '@radix-ui/themes'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({issue} : {issue?: Issue}) => {
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setSubmitting(false)
            setError('Something went wrong')
        }})

  return (
    <div className='max-w-xl space-y-4'>
        {error && <Callout.Root color='red'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}

        <form onSubmit={
        onSubmit} className='max-w-xl space-y-4'>
        <TextField.Root placeholder='Title' {...register('title')} defaultValue={issue?.title} /> 
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
            control={control}
            name='description'
            defaultValue={issue?.description || ''}
            render={({ field }) => (
                <SimpleMDE placeholder='Description' {...field} />
            )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>{issue ? 'Update Issue' : 'Submit New Issue'} {submitting && <Spinner />}</Button>
    </form></div>
   
  )
}

export default IssueForm