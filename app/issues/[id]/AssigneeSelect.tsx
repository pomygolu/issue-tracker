'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  // const [users, setUsers] = useState<User[]>([])

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const response = await axios.get<User[]>('/api/users')
  //     setUsers(response.data)
  //   }
  //   fetchUsers()
  // }, [])

  const onValueChange = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === 'none' ? null : userId,
      })
      .catch(error => {
        toast.error('Failed to update assignee');
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'none'}
        onValueChange={onValueChange}
      >
        <Select.Trigger placeholder="Select an assignee" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60 seconds
    retry: 3,
  });
};

export default AssigneeSelect;
