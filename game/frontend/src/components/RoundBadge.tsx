export interface RoundBadgeProps {
  status?: string;
}

export function RoundBadge({ status }: RoundBadgeProps) {
  return (
    <span className="round-badge" data-status={status}>
      {status ?? 'Round unavailable'}
    </span>
  );
}
