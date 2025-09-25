import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary"></div>
                <span className="text-xl font-bold">E-Shop</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your trusted e-commerce platform for quality products at great prices.
              </p>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=jewelery" className="text-muted-foreground hover:text-foreground">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=men's clothing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Men's Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=women's clothing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Women's Clothing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-muted-foreground hover:text-foreground">
                    News
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
