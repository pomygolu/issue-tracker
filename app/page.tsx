import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';
import { Flex, Grid } from '@radix-ui/themes';

export default async function Home() {
  const openCount = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgressCount = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closedCount = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummary
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
        <IssueChart
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
