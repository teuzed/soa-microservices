export interface Producto {
img: any;
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  quantity? : number  // Nuevo campo
}
