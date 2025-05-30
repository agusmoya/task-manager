export interface ICategory {
  id: string
  name: string
}

export interface ICountingCategories extends ICategory {
  quantity: number
}
