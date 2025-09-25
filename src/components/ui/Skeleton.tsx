"use client";

import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}


