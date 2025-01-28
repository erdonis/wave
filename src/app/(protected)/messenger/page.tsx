import MessageWidow from '@/components/Messenger/MessageWindow';
import PageHeader from '@/components/PageHeader';

export default async function Page() {
  return (
    <div className="pt-4 sm:px-4">
      <PageHeader heading="Messages" />
      <MessageWidow />
    </div>
  );
}
