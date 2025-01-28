import { Textarea } from '@/components/ui/Textarea';
import React, { useCallback, useEffect, useState } from 'react';
import AutoCompleteComponent, { NewMessageParams } from '@/components/Messenger/AutoCompleteComponent';
import { TextInput } from '@/components/ui/TextInput';
import type { MessageRecipientUser } from '@/app/api/messenger/users/GET';
import { SendMessagePostParams } from '@/app/api/messenger/message/POST';
import { GenericLoading } from '@/components/GenericLoading';
import { ButtonNaked } from '@/components/ui/ButtonNaked';
import './compose-message.css';
import { useToast } from '@/hooks/useToast';

export async function sendMessageRequest(msg: SendMessagePostParams, setLoading: (val: boolean) => void) {
  setLoading(true);
  const url = '/api/messenger/message';
  const res = await fetch(url, {
    method: 'POST', // HTTP method
    headers: {
      'Content-Type': 'application/json', // Specify the content type
    },
    body: JSON.stringify(msg),
  });
  setLoading(false);
  const result: { status: 'success' } | { status: 'error'; msg: string } = res.ok
    ? { status: 'success' }
    : { status: 'error', msg: `${res.status}: ${res.statusText}` };
  return result;
}

export default function ComposeMessage() {
  const [allUsers, setAllUsers] = useState<MessageRecipientUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [receiver, setReceiver] = useState<Pick<NewMessageParams, 'to' | 'toUserName'>>({ to: '', toUserName: '' });
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const { showToast } = useToast();

  const getAllUsers = async () => {
    const url = '/api/messenger/users/';
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      showToast({ title: 'Error', message: `${res.status}: ${res.statusText}`, type: 'error' });
    } else {
      const users: MessageRecipientUser[] = await res.json();
      setAllUsers(users);
    }
  };

  useEffect(() => {
    async function init() {
      await getAllUsers();
    }

    if (!loading) setLoading(true);
    init().then(() => {
      setLoading(false);
    });
  }, []);

  const sendButtonEnabled = !sendingMessage && receiver.to.length > 0 && body.length > 0 && subject.length;

  const sendMessage = useCallback(async () => {
    const res = await sendMessageRequest({ to: receiver.to, subject, body }, setSendingMessage);
    if (res.status === 'error') {
      showToast({ title: 'Error', message: res.msg, type: 'error' });
    } else {
      showToast({ title: 'Success', message: 'Message Sent', type: 'success' });
      setSubject('');
      setBody('');
      setReceiver({ to: '', toUserName: '' });
    }
  }, [body, receiver.to, showToast, subject]);
  return (
    <>
      {!loading && (
        <div className="mx-2 mb-6 px-2 pt-4 sm:px-0">
          <div className="mb-2">
            <AutoCompleteComponent
              allUsers={allUsers}
              currentReceiver={receiver}
              handleReceiverSelected={setReceiver}
            />
          </div>
          <div className="mb-2">
            <TextInput id="new-message-subject" label="Subject" value={subject} onChange={setSubject} />
          </div>
          <div>
            <Textarea
              id="new-message-body"
              className="min-h-56 w-full"
              label="Message"
              value={body}
              onChange={setBody}
            />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <ButtonNaked
                className="mx-4 flex items-center justify-center space-x-2 rounded bg-primary px-10 py-2 text-base text-white transition-colors duration-300 hover:bg-primary-accent focus:outline-none active:scale-95 active:ring-4 disabled:cursor-not-allowed disabled:opacity-50"
                onPress={sendMessage}
                isDisabled={!sendButtonEnabled}>
                Send
              </ButtonNaked>
            </div>
          </div>
        </div>
      )}
      {loading && <GenericLoading />}
    </>
  );
}
