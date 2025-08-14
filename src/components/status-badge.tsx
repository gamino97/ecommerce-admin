import { Badge } from '@/components/ui/badge';

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'completed':
      return 'default';
    case 'pending':
      return 'destructive';
    default:
      return 'secondary';
  }
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={getStatusBadgeVariant(status)}>
      {status}
    </Badge>
  );
}
