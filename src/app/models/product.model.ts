export type Product = {
  image: Image;
  name: string;
  category: string;
  price: number;
  description: string;
  listPrice: number;
  stock: number;
  quantity: number;
  
};

type Image = {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};
