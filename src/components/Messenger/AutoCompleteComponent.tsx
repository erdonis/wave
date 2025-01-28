import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Autosuggest, {
  ChangeEvent,
  InputProps,
  RenderInputComponentProps,
  SuggestionsFetchRequestedParams,
} from 'react-autosuggest';
import { MessageRecipientUser } from '@/app/api/messenger/users/GET';
import { SendMessagePostParams } from '@/app/api/messenger/message/POST';

interface Props {
  allUsers: MessageRecipientUser[];
  handleReceiverSelected: (params: Pick<NewMessageParams, 'to' | 'toUserName'>) => void;
  currentReceiver: Pick<NewMessageParams, 'to' | 'toUserName'>;
}

export type NewMessageParams = SendMessagePostParams & { toUserName: string };

function renderInputComponent(autoSuggestInputProps: RenderInputComponentProps) {
  return (
    <>
      <input {...autoSuggestInputProps} />
      {/* Floating Label */}
      <label
        htmlFor="autosuggest-messenger-to"
        className="absolute left-5 top-[9px] z-0 translate-y-0 cursor-text text-sm text-muted-foreground transition-all peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-lg peer-focus:top-[9px] peer-focus:translate-y-0 peer-focus:text-sm">
        To
      </label>
    </>
  );
}

export default function AutoSuggestComponent({ allUsers, handleReceiverSelected, currentReceiver }: Props) {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<MessageRecipientUser[]>([]);

  useEffect(() => {
    setValue(currentReceiver.toUserName);
  }, [currentReceiver]);
  /* const onFocus = () => {
    handleReceiverSelected({ to: '',  });
  }; */

  const inputProps: InputProps<MessageRecipientUser> = useMemo(
    () => ({
      placeholder: ' ',
      value,
      onChange: (_event: FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
        setValue(newValue);
      },
      onBlur: () => {
        if (value.length > 0) {
          const isUsername = allUsers.filter((au) => au.username === value);
          if (isUsername.length < 1) {
            setValue('');
            handleReceiverSelected({ to: '', toUserName: '' });
          }
        } else {
          handleReceiverSelected({ to: '', toUserName: '' });
        }
      },
    }),
    [handleReceiverSelected, value],
  );

  const theme = useMemo(() => {
    return {
      container: 'relative',
      input: 'peer w-full rounded-xl bg-input pb-2 px-5 pt-8 outline-none ring-foreground focus:ring-2',
      suggestionsContainer: 'w-full origin-top rounded-xl bg-input absolute z-10 mt-1',
      suggestion: 'text-md my-2 p-3 font-semibold hover:bg-primary/30 cursor-pointer',
      suggestionHighlighted: '',
    };
  }, []);

  const getSuggestions = useCallback(
    (suggestionValue: string): MessageRecipientUser[] => {
      const inputValue = suggestionValue.trim().toLowerCase();
      const inputLength = inputValue.length;
      return inputLength === 0
        ? []
        : allUsers.filter((lang) => lang.username.toLowerCase().slice(0, inputLength) === inputValue);
    },
    [allUsers],
  );

  const getSuggestionValue = useCallback((suggestion: MessageRecipientUser) => suggestion.username, []);

  const renderSuggestion = useCallback((suggestion: MessageRecipientUser) => suggestion.username, []);

  const onSuggestionsFetchRequested = useCallback(
    ({ value: suggestionValue }: SuggestionsFetchRequestedParams) => {
      setSuggestions(() => getSuggestions(suggestionValue));
    },
    [getSuggestions],
  );

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, []);

  const onSuggestionSelected = useCallback(
    (_event: FormEvent, { suggestion }: { suggestion: MessageRecipientUser }) => {
      handleReceiverSelected({ to: suggestion.id, toUserName: suggestion.username });
      setValue(suggestion.username);
    },
    [handleReceiverSelected],
  );
  return (
    <div className="relative mb-2">
      <Autosuggest
        id="autosuggest-messenger-to"
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
        renderInputComponent={renderInputComponent}
      />
    </div>
  );
}
