import { MessageListItem } from '@/app/api/messenger/inbox/GET';
import { ButtonNaked } from '@/components/ui/ButtonNaked';
import { Reply } from '@/svg_components';
import { Textarea } from '@/components/ui/Textarea';
import React, { useState } from 'react';
import { sendMessageRequest } from '@/components/Messenger/ComposeMessage';
import { useToast } from '@/hooks/useToast';

interface Props {
  msg: MessageListItem;
  viewType: 'sent' | 'inbox';
}

export default function MessageView({ msg, viewType }: Props) {
  const [reply, setReply] = useState<boolean>(false);
  const [replyBody, setReplyBody] = useState<string>();
  const [replyReqPending, setReplyReqPending] = useState(false);
  const { showToast } = useToast();

  const replyToMessage = async () => {
    if (replyBody && replyBody.length > 0) {
      const res = await sendMessageRequest(
        {
          to: viewType === 'inbox' ? msg.sender.id : msg.receiver.id,
          body: replyBody,
          subject: `Re: ${msg.subject}`,
        },
        setReplyReqPending,
      );
      if (res.status === 'error') {
        showToast({ title: 'Error', message: res.msg, type: 'error' });
      } else {
        showToast({ title: 'Success', message: 'Message Sent', type: 'success' });
        setReplyBody('');
        setReply(false);
      }
    }
  };
  return (
    <div className="px-2">
      <div className="my-4 flex w-full text-2xl">{msg.subject}</div>
      <div className="mb-4 flex w-full bg-secondary/50 px-2">
        <table>
          <tbody>
            <tr className="">
              <td className="py-2 pe-4">From:</td>
              <td>{msg.sender.username}</td>
            </tr>
            <tr className="">
              <td className="py-2">To:</td>
              <td>{msg.receiver.username}</td>
            </tr>
            <tr className="">
              <td className="py-2">Date:</td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pt-4">{msg.body}</div>
      <div className="mt-6 border-t py-2">
        <ButtonNaked
          onPress={() => setReply(true)}
          className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-primary-accent/30">
          <Reply stroke="currentColor" /> Reply
        </ButtonNaked>
      </div>
      {reply && (
        <>
          <div className="my-2">
            <Textarea
              id="new-message-body"
              className="min-h-56 w-full"
              label="Message"
              value={replyBody}
              onChange={setReplyBody}
            />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <ButtonNaked
                className="flex items-center justify-center space-x-2 rounded bg-primary px-10 py-2 text-base text-white transition-colors duration-300 hover:bg-primary-accent focus:outline-none active:scale-95 active:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
                onPress={replyToMessage}
                isDisabled={!replyBody || replyBody.length < 1 || replyReqPending}>
                Send
              </ButtonNaked>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
