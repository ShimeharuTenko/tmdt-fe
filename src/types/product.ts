export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string | null;
  shortDescription: string | null;
  description: string | null;
  price: number;
  isPublished: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  thumbnail: string | null;
  images: string[] | null;
  variants: any[] | null;
  tags: any[] | null;
  published: boolean;
}
