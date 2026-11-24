import { useState, type FormEvent } from 'react';

export interface TokenGateProps {
  onToken: (value: string) => void;
  error?: string;
}

export function TokenGate({ onToken, error }: TokenGateProps) {
  const [value, setValue] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onToken(value);
  }

  return (
    <form className="token-gate" onSubmit={handleSubmit}>
      <input
        type="password"
        aria-label="Admin token"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit">Enter</button>
      {error ? <p role="alert">{error}</p> : null}
    </form>
  );
}
