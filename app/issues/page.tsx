import React from 'react';
import prisma from '@/prisma/client';
import IssueAction from './IssueAction';
import { Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssuesTable, { IssueQuery, columnValues } from './IssuesTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const searchParamsObject = await searchParams;
  const { status, page } = await searchParams;
  const statuses = Object.values(Status);
  let statusFilter: Status | undefined = status;
  if (status && !statuses.includes(status)) {
    statusFilter = undefined;
  }

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  const totalCount = await prisma.issue.count({
    where: {
      status: statusFilter,
    },
  });

  const orderBy = columnValues.includes(searchParamsObject.orderBy)
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
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        itemCount={totalCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
