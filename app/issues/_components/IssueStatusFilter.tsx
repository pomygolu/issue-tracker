'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onValueChange = (status: Status | 'ALL') => {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') {
      params.set('status', status);
    }
    if (searchParams.get('orderBy')) {
      params.append('orderBy', searchParams.get('orderBy') as string);
    }
    const query = params.size ? `?${params.toString()}` : '';
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={onValueChange}
    >
      <Select.Trigger placeholder="Filter by status"></Select.Trigger>
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
