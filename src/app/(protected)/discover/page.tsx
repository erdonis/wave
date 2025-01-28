import { DiscoverFilters } from '@/components/DiscoverFilters';
import { DiscoverProfiles } from '@/components/DiscoverProfiles';
import { DiscoverSearch } from '@/components/DiscoverSearch';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Discover`,
};

export default async function Discover() {
  return (
    <div className="px-4 pt-4">
      <PageHeader heading="Discover" />
      <DiscoverSearch />
      <DiscoverFilters />
      <DiscoverProfiles />
    </div>
  );
}
