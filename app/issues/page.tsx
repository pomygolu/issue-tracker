import React from 'react';
import { Badge, Button, Table } from '@radix-ui/themes';
import Link from '../components/Link';
import NextLink from 'next/link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueAction from './IssueAction';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '../components/Pagination';

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParamsObject = await searchParams;
  const { status, page } = await searchParams;
  const statuses = Object.values(Status);
  let statusFilter: Status | undefined = status;
  if (status && !statuses.includes(status)) {
    statusFilter = undefined;
  }

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Title', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  const totalCount = await prisma.issue.count({
    where: {
      status: statusFilter,
    },
  });

  const orderBy = columns
    .map(column => column.value)
    .includes(searchParamsObject.orderBy)
    ? { [searchParamsObject.orderBy]: 'asc' }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: statusFilter,
    },
    orderBy,
    skip: skip,
    take: pageSize,
  });

  return (
    <div>
      <IssueAction />
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
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={totalCount}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
