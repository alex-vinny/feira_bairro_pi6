export interface Category {
  id: number;
  name: string;
  image: string;
  description?: string;
  count?: string | number; // Can be string like "500+" or number from database
  popular: boolean;
  createdAt?: string;
}

