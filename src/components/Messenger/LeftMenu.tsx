import { ActionsPlus, EnvelopeClosed, SentIcon } from '@/svg_components';
import { ButtonNaked } from '@/components/ui/ButtonNaked';

interface Props {
  inboxMessageCount: number;
  currentAction: 'compose' | 'inbox' | 'sent';
  handleActionChange: (action: this['currentAction']) => void;
}

/**
 * Adapted from https://www.creative-tim.com/twcomponents/component/tailwind-css-inbox-compose-new-message/
 */
export default function LeftMenu({ inboxMessageCount, currentAction, handleActionChange }: Props) {
  const menu: { label: string; icon: JSX.Element; onClick: () => void | Promise<void> }[] = [
    {
      label: 'Inbox',
      icon: <EnvelopeClosed />,
      onClick: () => {
        handleActionChange('inbox');
      },
    },
    {
      label: 'Sent',
      icon: <SentIcon />,
      onClick: () => {
        handleActionChange('sent');
      },
    },
  ];

  const handleCompose = () => {
    handleActionChange('compose');
  };

  const selectedClass = 'bg-primary text-base text-white';
  const unselectedClass = 'hover:bg-primary-accent/30';
  return (
    <>
      {/* Compose */}
      <div className="flex h-16 items-center">
        <ButtonNaked
          onPress={handleCompose}
          className="mx-4 flex h-10 w-full items-center justify-center space-x-2 rounded bg-primary py-2 text-base text-white transition-colors duration-300 hover:bg-primary-accent focus:outline-none active:scale-95 active:ring-4">
          <ActionsPlus stroke="currentColor" />
          <span>Compose</span>
        </ButtonNaked>
      </div>
      <div className="border-r border-gray-300 px-2 pb-8 pt-4">
        <ul className="space-y-2">
          {menu.map((m) => (
            <li key={m.label}>
              <ButtonNaked
                onPress={m.onClick}
                className={`relative flex h-12 w-full cursor-pointer items-center justify-between rounded px-4 py-1.5 ${
                  currentAction === m.label.toLowerCase() ? selectedClass : unselectedClass
                }`}>
                <span className="flex items-center space-x-2">
                  {m.icon} <span>{m.label}</span>
                </span>
                {m.label === 'Inbox' && (
                  <span
                    className={`rounded-lg px-2 py-0.5 text-xs font-bold ${
                      currentAction !== 'inbox'
                        ? 'bg-secondary-foreground text-white dark:bg-primary dark:text-white'
                        : 'bg-secondary text-primary'
                    }`}>
                    {inboxMessageCount}
                  </span>
                )}
              </ButtonNaked>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
