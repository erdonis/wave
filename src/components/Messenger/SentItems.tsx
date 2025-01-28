import MessageListViewer from '@/components/Messenger/MessageListViewer';

export default function SentItems({
  reload,
  setNavigationIcon,
}: {
  reload: number;
  setNavigationIcon: (icon: 'reload' | 'back') => void;
}) {
  return <MessageListViewer viewType="sent" reload={reload} setNavigationIcon={setNavigationIcon} />;
}
