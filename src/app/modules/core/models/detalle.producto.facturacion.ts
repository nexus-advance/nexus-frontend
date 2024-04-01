export interface DetalleFactura {
  id_catalogo: number;
  codigo: string;
  nombre: string;
  precio_sin_iva: number;
  precio_con_iva: number;
  cantidad: number;
  subtotal: number;
  descuento: number;
  id_descuento: number;
  iva: number;
  total: number;
  is_valid: boolean;
  item: any;
}

export interface DetalleCompraInv {
  id_catalogo: number;
  codigo: string;
  nombre: string;
  costo_unitario: number; 
  existencia: number;
  costo_promedio: number;
  cantidad: number;
  subtotal: number;
  descuento: number;
  id_descuento: number;
  iva: number;
  total: number;
  is_valid: boolean;
  Inventario?: any[];
  Kardex?: any[];
}
