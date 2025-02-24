export type User = {
  id: number
  user: string
  iat: string
}

export enum Category {
  Electronics = 'electronics',
  Jwelery = 'jewelery',
  MenClothing = "men's clothing",
  WomenClothing = "women's clothing"
}

type Rating = { rate: number; count: number }

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  rating: Rating
}
