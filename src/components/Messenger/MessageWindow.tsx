'use client';

import React, { useCallback, useState } from 'react';
import ComposeMessage from '@/components/Messenger/ComposeMessage';
import Inbox from '@/components/Messenger/Inbox';
import SentItems from '@/components/Messenger/SentItems';
import TopMenu from '@/components/Messenger/TopMenu';
import { BackArrow, Reload } from '@/svg_components';
import { ButtonNaked } from '@/components/ui/ButtonNaked';

export default function MessageWidow() {
  const [currentAction, setCurrentAction] = useState<'inbox' | 'sent' | 'compose'>('inbox');
  const [reload, setReload] = useState<number>(0);
  const [reloadIcon, setReloadIcon] = useState<'reload' | 'back'>('reload');

  const reloadMessages = useCallback(() => {
    setReload(Date.now());
  }, []);
  return (
    <>
      <div className="flex w-full px-2">
        <TopMenu inboxMessageCount={0} currentAction={currentAction} handleActionChange={setCurrentAction} />
      </div>
      <div className="flex h-16 items-center justify-between px-2 sm:ps-0">
        <h4 className="text-lg font-bold sm:px-0">
          {currentAction === 'inbox'
            ? 'Inbox'
            : currentAction === 'sent'
            ? 'Sent Messages'
            : currentAction === 'compose'
            ? 'New Message'
            : ''}
        </h4>
        <ButtonNaked
          className="flex items-center justify-center rounded-lg bg-primary px-2 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary-accent focus:outline-none active:scale-95 active:ring-4"
          onPress={reloadMessages}>
          {reloadIcon === 'reload' && <Reload stroke="currentColor" height="20" width="20" fill="currentColor" />}
          {reloadIcon === 'back' && <BackArrow stroke="currentColor" height="20" width="20" fill="currentColor" />}
        </ButtonNaked>
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="custom-scrollbar flex w-full overflow-x-auto rounded-lg shadow-xl">
          <div className="min-w-0 flex-1">
            {currentAction === 'compose' && <ComposeMessage />}
            {currentAction === 'inbox' && <Inbox reload={reload} setNavigationIcon={setReloadIcon} />}
            {currentAction === 'sent' && <SentItems reload={reload} setNavigationIcon={setReloadIcon} />}
          </div>
        </div>
      </div>
    </>
  );
}
