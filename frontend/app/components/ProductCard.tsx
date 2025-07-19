"use client";
import Image from "next/image"
import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "../redux/store"
import { addToCart } from "../redux/slices/cartSlice"
import { Product } from "../redux/slices/productsSlice"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    console.log('ProductCard: Adding to cart:', product);
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardHeader className="p-0">
        <div className="overflow-hidden rounded-t-lg">
          <Link href={`/products/${product.slug}`}>
            <Image 
              src={product.image} 
              alt={product.name} 
              width={200} 
              height={200} 
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" 
            />
          </Link>
        </div>
        {product.tag && (
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              product.tag === 'new' ? 'bg-green-500 text-white' :
              product.tag === 'sale' ? 'bg-red-500 text-white' :
              product.tag === 'popular' ? 'bg-blue-500 text-white' :
              'bg-gray-500 text-white'
            }`}>
              {product.tag.toUpperCase()}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-2">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
            {product.name}
          </CardTitle>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)}
          </p>
          {product.oldPrice && (
            <p className="text-lg text-gray-500 line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">({product.rating})</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Stock: {product.stock} available
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700" 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}
