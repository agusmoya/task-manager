export interface Category {
  id: string
  name: string
}

export interface CountingCategories extends Category {
  quantity: number
}
