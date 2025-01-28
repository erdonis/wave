import { ActionsPlus, EnvelopeClosed, SentIcon } from '@/svg_components';
import { useCallback } from 'react';
import { ButtonNaked } from '@/components/ui/ButtonNaked';

interface Props {
  inboxMessageCount: number;
  currentAction: 'compose' | 'inbox' | 'sent';
  handleActionChange: (action: this['currentAction']) => void;
}

/**
 * Adapted from https://www.creative-tim.com/twcomponents/component/tailwind-css-inbox-compose-new-message/
 */
export default function TopMenu({ inboxMessageCount, currentAction, handleActionChange }: Props) {
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

  const handleCompose = useCallback(() => {
    handleActionChange('compose');
  }, [handleActionChange]);

  const selectedClass = 'bg-primary-accent/30';
  const unselectedClass = 'hover:bg-primary-accent/30';
  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          {menu.map((m) => (
            <ButtonNaked
              key={m.label}
              onPress={m.onClick}
              className={`relative me-2 inline-flex cursor-pointer items-center rounded px-2 py-2 text-sm ${
                currentAction === m.label.toLowerCase() ? selectedClass : unselectedClass
              }`}>
              <span className="flex items-center">
                <span className="me-2 hidden sm:block">{m.icon}</span> <span>{m.label}</span>
              </span>
              {m.label === 'Inbox' && (
                <span
                  className={`ms-2 rounded-lg px-2 py-0.5 text-xs font-bold opacity-100 ${
                    currentAction !== 'inbox'
                      ? 'bg-secondary-foreground text-white dark:bg-primary dark:text-white'
                      : 'bg-secondary-foreground text-white dark:text-primary'
                  }`}>
                  {inboxMessageCount}
                </span>
              )}
            </ButtonNaked>
          ))}
        </div>
        {/* Compose */}
        <div className="flex items-center">
          <ButtonNaked
            onPress={handleCompose}
            className="flex items-center justify-center rounded bg-primary px-2 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary-accent focus:outline-none active:scale-95 active:ring-4">
            <ActionsPlus className="hidden sm:block" stroke="currentColor" />
            <span className="sm:ms-2">Compose</span>
          </ButtonNaked>
        </div>
      </div>

      {/* <div className="">
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
      </div> */}
    </>
  );
}
