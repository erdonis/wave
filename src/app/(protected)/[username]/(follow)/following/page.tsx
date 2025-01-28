import { DiscoverProfiles } from '@/components/DiscoverProfiles';
import { DiscoverSearch } from '@/components/DiscoverSearch';
import { DiscoverFilters } from '@/components/DiscoverFilters';
import PageHeader from '@/components/PageHeader';
import { getProfile } from '../../getProfile';

export async function generateMetadata({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username);
  return {
    title: `Following | ${profile?.name}` || 'Following',
  };
}

export default async function Page({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username);

  return (
    <div className="p-4">
      <PageHeader heading={`${profile?.name}'s Following`} />
      <DiscoverSearch label="Search Following" />
      <DiscoverFilters />
      <DiscoverProfiles followingOf={profile?.id} />
    </div>
  );
}
