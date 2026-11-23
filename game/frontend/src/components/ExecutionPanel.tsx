// Structural shape of the execution fields this panel reads. Matches the
// ExecutionInfo contract (api/client.ts) that the admin client will export.
export interface ExecutionPanelExecution {
  updated_at: string;
  error: string;
  log?: string;
  tests?: string;
  release_version?: string;
}

export interface ExecutionPanelProps {
  execution?: ExecutionPanelExecution;
  contributionCount: number;
}

function formatDuration(updatedAt: string): string {
  const updated = Date.parse(updatedAt);
  if (Number.isNaN(updated)) {
    return 'Not available';
  }
  const totalSeconds = Math.max(0, Math.floor((Date.now() - updated) / 1000));
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ${minutes % 60}m`;
  }
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}

export function ExecutionPanel({ execution, contributionCount }: ExecutionPanelProps) {
  return (
    <section className="execution-panel" aria-label="Execution">
      <p>Contributions: {contributionCount}</p>
      <p>Duration: {execution ? formatDuration(execution.updated_at) : 'Not available'}</p>

      <h3>Agent logs</h3>
      <pre>{execution?.log || 'Not available'}</pre>

      <h3>Test results</h3>
      <pre>{execution?.tests || 'Not available'}</pre>

      <h3>Release version</h3>
      <p>{execution?.release_version || 'Not available'}</p>

      {execution?.error && <p role="alert">Failure reason: {execution.error}</p>}
    </section>
  );
}
