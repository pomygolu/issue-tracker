import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import React from 'react';
import Link from '../components/Link';
import IssueStatusBadge from '../components/IssueStatusBadge';
import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}

const IssuesTable = async ({ searchParams, issues }: Props) => {
  const searchParamsObject = await searchParams;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(column => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: { ...searchParamsObject, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParamsObject.orderBy && (
                <ArrowUpIcon className="w-4 h-4 inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toLocaleDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Title', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnValues = columns.map(column => column.value);

export default IssuesTable;
