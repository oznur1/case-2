"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import CartItem from "./CartItem";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartTotal } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";

export default function CartPageClient() {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-muted-foreground">Add some products to your cart to get started.</p>
        </div>

        <Link href="/products">
          <Button size="lg">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
        <p className="mt-4 text-lg text-muted-foreground">Review your items and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(cartTotal * 0.1)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal + cartTotal * 0.1)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <Link href="/products">
                <Button variant="outline" className="w-full">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
