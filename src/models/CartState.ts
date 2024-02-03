import Product from "./Product";

export default interface CartState {
  id: string;
  products: Product[];
  total: number;
  totalWithDiscount: number;
  client: string;
  date: Date;
  typeDocument: string;
  documentNumber: number;
  IVACondition: string;
  entrega?: number;
  pago?: boolean;
  tipoFactura?: string;
  iva: number;
  gain: number;
  nroAsociado?: number;
}
