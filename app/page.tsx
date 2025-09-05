import Image from 'next/image';
import Pagination from './components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  return (
    <div>
      <Pagination currentPage={parseInt(page)} pageSize={10} itemCount={100} />
    </div>
  );
}
