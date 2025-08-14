import { Skeleton } from "@heroui/react";

export default function TableSkeleton() {
  return (
    <div className="rounded-xl bg-white  p-4 shadow">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-2 pb-4">
        <Skeleton className="h-4 w-24" /> {/* Ticket ID */}
        <Skeleton className="h-4 w-28" /> {/* User Name */}
        <Skeleton className="h-4 w-20" /> {/* Reason */}
        <Skeleton className="h-4 w-24" /> {/* Created On */}
        <Skeleton className="h-4 w-16" /> {/* Status */}
        <Skeleton className="h-4 w-24" /> {/* Action */}
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 items-center px-2 py-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-2">
        <Skeleton className="h-4 w-48" /> {/* Showing X of Y */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-12 rounded-md" /> {/* Select per page */}
          <Skeleton className="h-8 w-8 rounded-md" /> {/* Prev */}
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Current */}
        </div>
      </div>
    </div>
  );
}
