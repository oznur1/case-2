"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Button from "@/components/ui/Button";
import { Product } from "@/lib/types";
import { formatPrice, formatRating, truncateText } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { addToast } from "@/store/slices/toastSlice";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="group overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl border bg-card text-card-foreground shadow">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center rounded-full bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
            {truncateText(product.title, 60)}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{truncateText(product.description, 120)}</p>

        {/* Rating */}
        <div className="mt-3 flex items-center space-x-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {formatRating(product.rating.rate)} ({product.rating.count})
          </span>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
        </div>

        <Button
          size="sm"
          className="ml-4"
          onClick={(e) => {
            e.preventDefault();
            dispatch(addToCart(product));
            dispatch(
              addToast({
                message: `${truncateText(product.title, 40)} added to cart`,
                type: "cart",
                duration: 2000,
              })
            );
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
