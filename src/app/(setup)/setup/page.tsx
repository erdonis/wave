import { EditProfileForm } from '@/components/EditProfileForm';
import { ResponsiveContainer } from '@/components/ui/ResponsiveContainer';

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Setup Profile`,
};

export default function Page() {
  return (
    <ResponsiveContainer className="mx-auto my-4 px-4 md:px-0">
      <h1 className="mb-1 text-3xl font-bold">Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}!</h1>
      <p className="mb-4 text-muted-foreground">
        Please setup your profile to proceed, only the <b>name</b> and <b>username</b> fields are required.
      </p>
      <EditProfileForm redirectTo="/feed" />
    </ResponsiveContainer>
  );
}
