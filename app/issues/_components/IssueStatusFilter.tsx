'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const onValueChange = (value: string) => {
    const status = value === 'ALL' ? '' : (value as Status);
    if (status) {
      router.push(`/issues?status=${status}`);
    } else {
      router.push('/issues');
    }
  };

  return (
    <Select.Root onValueChange={onValueChange}>
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
