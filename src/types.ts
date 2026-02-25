export type Category = 'Ethnic Wear' | 'Jewellery';
export type Gender = 'Men' | 'Women' | 'Kids';
export type AgeGroup = 'Adults' | 'Kids';
export type Ethnicity = 'Gujarati' | 'Marathi' | 'Punjabi' | 'Rajasthani' | 'South Indian' | 'Bengali' | 'Kashmiri';
export type TransactionType = 'Buy' | 'Rent';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rentPrice: number;
  category: Category;
  gender: Gender;
  ageGroup: AgeGroup;
  ethnicity: Ethnicity;
  images: string[];
  vendorName: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  isAvailableForRent: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  transactionType: TransactionType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
}
