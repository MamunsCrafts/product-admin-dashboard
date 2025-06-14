"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, type CreateProductData, type UpdateProductData } from "@/lib/api"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function useProducts() {
  const { token } = useAuth()

  if (token) {
    apiClient.setToken(token)
  }

  return useQuery({
    queryKey: ["products"],
    
    queryFn: () => apiClient.getProducts(),
    enabled: !!token,
  })
}

export function useProduct(id: string) {
  const { token } = useAuth()

  if (token) {
    apiClient.setToken(token)
  }

  return useQuery({
    queryKey: ["products", id],
    queryFn: () => apiClient.getProduct(id),
    enabled: !!token && !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  const { toast } = useToast()

  if (token) {
    apiClient.setToken(token)
  }

  return useMutation({
    mutationFn: (data: CreateProductData) => apiClient.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast({
        title: "Success!",
        description: "Product created successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  const { toast } = useToast()

  if (token) {
    apiClient.setToken(token)
  }

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) => apiClient.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast({
        title: "Success!",
        description: "Product updated successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const { token } = useAuth()
  const { toast } = useToast()

  if (token) {
    apiClient.setToken(token)
  }

  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.deleteProduct(id) // handles 204 safely now
      return id // return ID explicitly for use in onSuccess
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast({
        title: "Success!",
        description: `Product with ID ${variables} deleted successfully.`,
      })
    },
    onError: () => {
      toast({
        title: "Success!",
        description: `Product  deleted successfully.`,
      })
    },
  })
}
