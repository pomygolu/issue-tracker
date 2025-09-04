'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/createIssueSchema'
import { z } from 'zod'
import { Text } from '@radix-ui/themes'

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const [error, setError] = useState('')
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
  return (
    <div className='max-w-xl space-y-4'>
        {error && <Callout.Root color='red'>
            <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}

        <form onSubmit={handleSubmit(async (data) => {
        try {
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setError('Something went wrong')
        }
        
    })} className='max-w-xl space-y-4'>
        <TextField.Root placeholder='Title' {...register('title')}>
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller
            control={control}
            name='description'
            render={({ field }) => (
                <SimpleMDE placeholder='Description' {...field} />
            )}
        />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
    </form></div>
   
  )
}

export default NewIssuePage