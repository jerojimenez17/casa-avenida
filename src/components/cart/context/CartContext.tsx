import { createContext } from "react";
import CartState from "../../../models/CartState";
import Product from "../../../models/Product";

export default interface CartContextProps {
  cartState: CartState;
  addItem: (product: Product) => void;
  addUnit: (product: Product) => void;
  removeUnit: (product: Product) => void;
  removeAll: () => void;
  removeItem: (product: Product) => void;
  changePrice: (product: Product) => void;
  changeAmount: (product: Product) => void;
  total: () => void;
  discount: (disc: number) => void;
  gain: (gain: number) => void;
  iva: (iva: number) => void;
  clientName: (name: string) => void;
  typeDocument: (type: string) => void;
  documentNumber: (number: number) => void;
  date: (newDate: Date) => void;
  entrega: (number: number) => void;
  nroAsociado: (number: number) => void;
  IVACondition: (condition: string) => void;
  tipoFactura: (tipoFactura: string) => void;
  setState: (cartState: CartState) => void;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);
