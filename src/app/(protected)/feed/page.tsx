import { CreatePostModalLauncher } from '@/components/CreatePostModalLauncher';
import { Posts } from '@/components/Posts';
import { getServerUser } from '@/lib/getServerUser';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Feed`,
};

export default async function Page() {
  const [user] = await getServerUser();
  return (
    <div className="px-4 pt-4">
      <PageHeader heading="Feed" />
      <CreatePostModalLauncher />
      {user && <Posts type="feed" userId={user.id} />}
    </div>
  );
}
