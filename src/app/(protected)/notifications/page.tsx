import { getServerUser } from '@/lib/getServerUser';
import { Notifications } from './Notifications';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Notifications`,
};

export default async function Page() {
  const [user] = await getServerUser();

  if (!user) return null;
  return (
    <div className="px-4 pt-4">
      <Notifications userId={user.id} />
    </div>
  );
}