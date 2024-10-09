export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}

export interface CartAttributes {
  id?: number;
  userId?: number;
  products?: ProductAttributes[];
}

export interface CartProductAttributes {
  id?: number;
  count?: number;
  productId?: number;
  cartId?: number;
}

export interface ProductAttributes {
  id?: number;
  name: string;
  img?: string;
  price: number;
  rating?: number;
  typeId?: number;
  brandId?: number;
}

export interface TypeAttributes {
  id?: number;
  name: string;
  brands?: BrandAttributes[];
}

export interface BrandAttributes {
  id?: number;
  name: string;
  types?: TypeAttributes[];
}

export interface RatingAttributes {
  id?: number;
  rate: number;
  productId?: number;
  userId?: number;
}

export interface ProductInfoAttributes {
  id?: number;
  title: string;
  description: string;
  productId?: number;
}

export interface TypeBrandAttributes {
  id?: number;
  typeId?: number;
  brandId?: number;
}
