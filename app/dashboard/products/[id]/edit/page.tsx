"use client"

import { useProduct } from "@/hooks/use-products"
import { ProductForm } from "@/components/dashboard/product-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { Product, ProductDetails } from "@/lib/api"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { data: product, isLoading } = useProduct(params.id)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  useEffect(() => {
    setSelectedProduct(
      product
    ? {
        ...product,
        tags: typeof product.tags === 'string'
          ? (product.tags as string).split(',').map(tag => tag.trim())
          : product.tags
      }
    : null
    );  }, [product])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-600">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Modify the information below to update the product</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedProduct &&
          <ProductForm product={selectedProduct} />}
        </CardContent>
      </Card>
    </div>
  )
}
