"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";

interface ProductsPageClientProps {
  products: Product[];
}

export default function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const searchParams = useSearchParams();

  // Check for category parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const categoryFiltered = products.filter((product) => product.category === categoryParam);
      setFilteredProducts(categoryFiltered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchParams]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <ProductFilters products={products} onFilteredProducts={setFilteredProducts} />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
