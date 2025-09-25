"use client";

import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { Product } from "@/lib/types";
import { formatPrice, formatRating, capitalizeWords } from "@/lib/utils";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { addToast } from "@/store/slices/toastSlice";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb / Back button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {capitalizeWords(product.category)}
            </span>
          </div>

          {/* Title and Rating */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {formatRating(product.rating.rate)} ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            <span className="text-4xl font-bold text-foreground">{formatPrice(product.price)}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                dispatch(addToCart(product));
                dispatch(
                  addToast({
                    message: `${product.title} added to cart`,
                    type: "cart",
                    duration: 2000,
                  })
                );
              }}
            >
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => {
                // TODO: Add to wishlist functionality
                console.log("Add to wishlist:", product.id);
              }}
            >
              Add to Wishlist
            </Button>
          </div>

          {/* Product Details */}
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <h3 className="font-semibold mb-4">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category:</dt>
                <dd className="font-medium">{capitalizeWords(product.category)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Rating:</dt>
                <dd className="font-medium">{formatRating(product.rating.rate)}/5</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Reviews:</dt>
                <dd className="font-medium">{product.rating.count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Product ID:</dt>
                <dd className="font-medium">#{product.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
