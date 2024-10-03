export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

export interface CartAttributes {
  id?: number;
  UserId?: number;
  Products?: ProductAttributes[];
}

export interface CartProductAttributes {
  id?: number;
  count?: number;
  ProductId?: number;
  CartId?: number;
}

export interface ProductAttributes {
  id?: number;
  name: string;
  img?: string;
  price: number;
  rating?: number;
  TypeId?: number;
  BrandId?: number;
}

export interface TypeAttributes {
  id?: number;
  name: string;
  Brands?: BrandAttributes[];
}

export interface BrandAttributes {
  id?: number;
  name: string;
  Types?: TypeAttributes[];
}

export interface RatingAttributes {
  id?: number;
  rate: number;
}

export interface ProductInfoAttributes {
  id?: number;
  title: string;
  description: string;
  ProductId?: number;
}

export interface TypeBrandAttributes {
  id?: number;
  TypeId?: number;
  BrandId?: number;
}
