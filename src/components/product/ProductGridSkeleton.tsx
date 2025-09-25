"use client";

import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-lg border bg-card p-4">
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}


