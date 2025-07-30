import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  // Create an array of 5 skeleton rows
  const skeletonRows = Array(5).fill(0);
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="rounded-md border">
        <div className="border-b">
          <div className="grid grid-cols-3 px-4 py-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="divide-y">
          {skeletonRows.map((_, index) => (
            <div key={index} className="grid grid-cols-3 px-4 py-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
