"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "./ProductCard";
import { Product } from "../redux/slices/productsSlice";

interface ProductsSectionProps {
  title: string;
  category: string;
  products: Product[];
  loading: boolean;
}

export default function ProductsSection({ title, category, products, loading }: ProductsSectionProps) {
  const [page, setPage] = useState(0)
  const itemsPerPage = 4
  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const currentProducts = products.slice(start, end)

  console.log(`ProductSection (${category}):`, {
    title,
    totalProducts: products.length,
    currentProducts: currentProducts.length,
    loading
  });

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No products available in this category</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-4">
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
          <Button disabled={end >= products.length} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}
    </section>
  )
}
