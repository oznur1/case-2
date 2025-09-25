import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  className?: string;
}

export default function ProductGrid({ products, title, className = "" }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-lg font-medium text-muted-foreground">No products found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your search criteria or browse our categories.
        </p>
      </div>
    );
  }

  return (
    <section className={className}>
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4} // Prioritize loading for first 4 images
          />
        ))}
      </div>
    </section>
  );
}
