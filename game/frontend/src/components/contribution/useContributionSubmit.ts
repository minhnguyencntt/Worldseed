import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { MAX_PER_PLAYER, MAX_PROMPT_LENGTH, submitContribution } from '../../api/client';
import { BLANK_MESSAGE, errorMessage, type Entry } from './messages';

export function useContributionSubmit(
  entries: Entry[],
  setEntries: Dispatch<SetStateAction<Entry[]>>,
) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [validation, setValidation] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const remaining = MAX_PER_PLAYER - entries.filter((e) => e.state === 'sent').length;
  const length = Array.from(text.trim()).length;
  const overLimit = length > MAX_PROMPT_LENGTH;
  const submitting = entries.some((e) => e.state === 'sending');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || remaining <= 0) return;
    const prompt = text.trim();
    if (prompt === '') {
      setValidation(BLANK_MESSAGE);
      return;
    }
    if (overLimit) return;

    const key = Date.now();
    setText('');
    setError(undefined);
    setSuccess(undefined);
    setValidation(undefined);
    setEntries((prev) => [...prev, { key, prompt, state: 'sending' }]);

    try {
      await submitContribution(prompt);
      setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, state: 'sent' } : e)));
      setSuccess('Suggestion sent');
    } catch (err) {
      setEntries((prev) => prev.map((e) => (e.key === key ? { ...e, state: 'failed' } : e)));
      setSuccess(undefined);
      setError(errorMessage(err));
    }
  }

  function onTextChange(value: string) {
    setText(value);
    setValidation(undefined);
    setSuccess(undefined);
  }

  return {
    text,
    error,
    validation,
    success,
    remaining,
    length,
    overLimit,
    submitting,
    handleSubmit,
    onTextChange,
  };
}
