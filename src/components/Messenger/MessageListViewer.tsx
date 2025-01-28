import React, { useCallback, useEffect, useState } from 'react';
import { MessageListItem } from '@/app/api/messenger/inbox/GET';
import { Profile } from '@/svg_components';
import { format, intlFormat, isThisYear, isToday } from 'date-fns';
import { GenericLoading } from '@/components/GenericLoading';
import MessageView from '@/components/Messenger/MessageView';

interface Props {
  viewType: 'sent' | 'inbox';
  reload: number;
  setNavigationIcon: (icon: 'reload' | 'back') => void;
}

const inboxUrl = `/api/messenger/inbox`;
const outboxUrl = `/api/messenger/sent-message`;

async function markAsRead(msg: MessageListItem) {
  try {
    if (!msg.read) {
      const markAsReadUrl = `/api/messenger/message/event/read/${msg.id}`;
      await fetch(markAsReadUrl);
      // eslint-disable-next-line no-param-reassign
      msg.read = true;
    }
  } catch (e) {
    console.log(e);
  }
}

export default function MessageListViewer({ viewType, reload, setNavigationIcon }: Props) {
  const [messageList, setMessageList] = useState<MessageListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMessage, setViewMessage] = useState<MessageListItem | undefined>(undefined);
  const init = useCallback(async () => {
    setLoading(true);
    const url = viewType === 'inbox' ? inboxUrl : outboxUrl;
    const res = await fetch(url, { cache: 'no-store' });
    setMessageList(await res.json());
    setLoading(false);
  }, [viewType]);
  useEffect(() => {
    setNavigationIcon('reload');
    init();
  }, [init]);
  useEffect(() => {
    if (viewMessage !== undefined) {
      setViewMessage(undefined);
      setNavigationIcon('reload');
    } else {
      init();
    }
  }, [init, reload]);

  const messageOtherPartyUsername = (msg: MessageListItem) => {
    return viewType === 'inbox' ? msg.sender.username : msg.receiver.username;
  };

  const highlightMessage = (msg: MessageListItem) => {
    return viewType === 'inbox' && msg.read === false;
  };

  const formatDate = (ts: number) => {
    const date = new Date(ts);
    if (isToday(date)) {
      return format(date, 'h:mm aaa');
    }
    if (isThisYear(date)) {
      return format(date, 'd MMM');
    }
    return intlFormat(date, { year: 'numeric', month: 'numeric', day: 'numeric' });
  };

  const viewEmail = async (msg: MessageListItem) => {
    setViewMessage(msg);
    setNavigationIcon('back');
    if (viewType === 'inbox') await markAsRead(msg);
  };

  return (
    <>
      {viewMessage && viewMessage.subject && <MessageView msg={viewMessage} viewType={viewType} />}
      {!loading && !viewMessage && messageList.length === 0 && (
        <div className="flex w-full justify-center">No Messages found!</div>
      )}
      {!loading &&
        !viewMessage &&
        messageList.map((msg) => (
          <div
            role="button"
            key={msg.id}
            tabIndex={0}
            onClick={() => viewEmail(msg)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') viewEmail(msg);
            }}
            className="my-3 flex w-full cursor-pointer justify-center rounded-xl px-2 py-3 hover:bg-primary-accent/30">
            <div className="me-2 w-[40px] pt-1">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-accent/90 p-2">
                <Profile stroke="white" />
              </div>
            </div>
            <div className={`me-1 min-w-0 flex-grow ${highlightMessage(msg) ? 'font-semibold' : ''}`}>
              <div className="flex w-full justify-between">
                <div className="min-w-0 flex-grow truncate text-base">@{messageOtherPartyUsername(msg)}</div>
                <div className="flex-shrink-0 text-xs">{formatDate(msg.createdAt)}</div>
              </div>
              <div className="text-muted-forground min-w-0 max-w-full overflow-hidden truncate opacity-80">
                {msg.subject}
              </div>
              <div className="text-muted-forground min-w-0 max-w-full overflow-hidden truncate opacity-80">
                {msg.body}
              </div>
            </div>
          </div>
        ))}

      {loading && <GenericLoading />}
    </>
  );
}
