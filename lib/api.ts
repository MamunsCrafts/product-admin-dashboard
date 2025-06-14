const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface Product {
  id: string
  name: string
  description: string
  tags: string[]
  price: number
  createdAt: string
  updatedAt: string
}

export interface ProductDetails {
  id: string
  name: string
  description: string
  tags: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductData {
  name: string
  description: string
  tags: string[]
  price: number
}

export interface UpdateProductData extends CreateProductData {}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string | null) {
    this.token = token
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth
  async login(username: string, password: string): Promise<{ token: string }> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
  }

  // Products
  async getProducts(): Promise<ProductDetails[]> {
    return this.request("/products")
  }

  async getProduct(id: string): Promise<Product> {
    return this.request(`/products/${id}`)
  }

  async createProduct(data: CreateProductData): Promise<Product> {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
    })

    if (response.status !== 204) {
      throw new Error(`Failed to delete product with id ${id}. Status: ${response.status}`)
    }
    return;
  }

  async getSuggestProductsTagsFromAIModel(data: { name: string; description: string }): Promise<string[]> {


    // const temp = "http://118.179.149.32:3005"
    const response = await fetch(`${this.baseURL}/suggest-tags/suggest-tags`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      },
      body: JSON.stringify(data),
    })

    return response.json().then((data) => {
      if (!response.ok) {
        throw new Error(`Failed to suggest tags: ${data.message || "Unknown error"}`)
      }
      return data.suggestedTags || []})
    // return this.request(`/suggest-tags/suggest-tags}`, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
  }

}

export const apiClient = new ApiClient(API_BASE_URL)
