"use client";

import React from "react";
import Link from "next/link";

export default function CategoriesPageClient({ categories }: { categories: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category}
          href={`/products?category=${encodeURIComponent(category)}`}
          className="group relative rounded-lg border bg-card p-6 text-center hover:shadow-lg transition-all duration-300"
       >
          <div className="text-4xl mb-4">🏷️</div>
          <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {category}
          </h3>
        </Link>
      ))}
    </div>
  );
}


