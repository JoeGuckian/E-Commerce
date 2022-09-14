export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

export interface CartProduct extends Product {
  quantity: number;
}

interface Rating {
  rate: number;
  count: number;
}

export type CategoryNames =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";
