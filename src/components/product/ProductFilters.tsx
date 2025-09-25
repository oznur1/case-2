"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import { capitalizeWords } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface ProductFiltersProps {
  products: Product[];
  onFilteredProducts: (filtered: Product[]) => void;
}

export default function ProductFilters({ products, onFilteredProducts }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const searchParams = useSearchParams();

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((product) => product.category)));

  // Set initial category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max);

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order
        break;
    }

    onFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange, products, onFilteredProducts]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");
    setPriceRange({ min: 0, max: 1000 });
  };

  return (
    <div className="bg-background border-b pb-6 mb-8">
      <div className="space-y-6">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
            Search Products
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {capitalizeWords(category)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-foreground mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="default">Default</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="price-min" className="block text-sm font-medium text-foreground mb-2">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                id="price-min"
                value={priceRange.min}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
                placeholder="Min"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <input
                type="number"
                id="price-max"
                value={priceRange.max}
                onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
                placeholder="Max"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
