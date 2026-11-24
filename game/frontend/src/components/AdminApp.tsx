import { closeRound, openRound, WORLD_ID } from '../api/client';
import { AdminControls } from './admin/AdminControls';
import { useAdminRound } from './admin/useAdminRound';
import { LifecycleStepper } from './LifecycleStepper';
import { TokenGate } from './TokenGate';

export function AdminApp() {
  const {
    token,
    gateError,
    round,
    contributions,
    durationHours,
    worldTitle,
    error,
    setToken,
    setGateError,
    setDurationHours,
    runRoundAction,
    handleCreateRound,
  } = useAdminRound();

  if (!token) {
    return (
      <TokenGate
        onToken={(value) => {
          setGateError(undefined);
          setToken(value);
        }}
        error={gateError}
      />
    );
  }

  return (
    <main className="admin-app">
      <h1>Admin · {worldTitle ?? WORLD_ID}</h1>
      {error ? <p role="alert">{error}</p> : null}
      {round ? (
        <p>
          Round {round.id} · number {round.number} · status {round.status}
        </p>
      ) : (
        <p>Loading round…</p>
      )}
      {round ? <LifecycleStepper status={round.status} /> : null}
      <AdminControls
        durationHours={durationHours}
        onDurationChange={setDurationHours}
        onCreate={handleCreateRound}
        onOpen={() => runRoundAction(openRound)}
        onClose={() => runRoundAction(closeRound)}
      />
      <ul aria-label="Contributions">
        {contributions.map((c) => (
          <li key={c.id}>{c.prompt}</li>
        ))}
      </ul>
    </main>
  );
}
