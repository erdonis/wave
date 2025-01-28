import MessageListViewer from '@/components/Messenger/MessageListViewer';

export default function Inbox({
  reload,
  setNavigationIcon,
}: {
  reload: number;
  setNavigationIcon: (icon: 'reload' | 'back') => void;
}) {
  return <MessageListViewer viewType="inbox" reload={reload} setNavigationIcon={setNavigationIcon} />;
}
