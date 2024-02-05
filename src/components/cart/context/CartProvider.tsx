import React, { useReducer } from "react";
import { CartContext } from "./CartContext";
import { CartReducer } from "./CartReducer";
import CartState from "../../../models/CartState";
import Product from "../../../models/Product";

const INITIAL_STATE: CartState = {
  id: "",
  date: new Date(),
  products: [],
  total: 0,
  totalWithDiscount: 0,
  client: "",
  typeDocument: "",
  documentNumber: 0,
  IVACondition: "Consumidor Final",
  tipoFactura: "C",
  iva: 21,
  gain: 50,
  pago: false,
  entrega: 0,
};

interface props {
  children: JSX.Element | JSX.Element[];
}

const CartProvider = ({ children }: props) => {
  const [cartState, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  const addItem = (product: Product) => {
    dispatch({
      type: "addItem",
      payload: product,
    });
  };
  const addUnit = (product: Product) => {
    dispatch({
      type: "addUnit",
      payload: product,
    });
  };
  const removeUnit = (product: Product) => {
    dispatch({
      type: "removeUnit",
      payload: product,
    });
  };
  const removeItem = (product: Product) => {
    dispatch({
      type: "removeItem",
      payload: product,
    });
  };
  const setState = (cartState: CartState) => {
    dispatch({
      type: "setState",
      payload: cartState,
    });
  };
  const removeAll = () => {
    dispatch({
      type: "removeAll",
      payload: null,
    });
  };
  const changePrice = (product: Product) => {
    dispatch({
      type: "changePrice",
      payload: product,
    });
  };
  const changeAmount = (product: Product) => {
    dispatch({
      type: "changeAmount",
      payload: product,
    });
  };
  const total = () => {
    dispatch({
      type: "total",
      payload: null,
    });
  };
  const discount = (disc: number) => {
    dispatch({
      type: "discount",
      payload: disc,
    });
  };
  const iva = (iva: number) => {
    dispatch({
      type: "iva",
      payload: iva,
    });
  };
  const gain = (gain: number) => {
    dispatch({
      type: "gain",
      payload: gain,
    });
  };
  const date = (date: Date) => {
    dispatch({
      type: "date",
      payload: date,
    });
  };
  const clientName = (name: string) => {
    dispatch({
      type: "clientName",
      payload: name,
    });
  };
  const typeDocument = (type: string) => {
    dispatch({
      type: "typeDocument",
      payload: type,
    });
  };
  const tipoFactura = (tipoFactura: string) => {
    dispatch({
      type: "tipoFactura",
      payload: tipoFactura,
    });
  };
  const documentNumber = (number: number) => {
    dispatch({
      type: "documentNumber",
      payload: number,
    });
  };
  const nroAsociado = (number: number) => {
    dispatch({
      type: "nroAsociado",
      payload: number,
    });
  };
  const IVACondition = (condition: string) => {
    dispatch({
      type: "IVACondition",
      payload: condition,
    });
  };
  const entrega = (entrega: number) => {
    dispatch({
      type: "entrega",
      payload: entrega,
    });
  };

  const values = {
    cartState: cartState,
    addItem: addItem,
    addUnit: addUnit,
    removeUnit: removeUnit,
    removeItem: removeItem,
    removeAll: removeAll,
    changePrice: changePrice,
    changeAmount: changeAmount,
    total: total,
    discount: discount,
    clientName: clientName,
    typeDocument: typeDocument,
    documentNumber: documentNumber,
    IVACondition: IVACondition,
    tipoFactura: tipoFactura,
    entrega: entrega,
    iva: iva,
    gain: gain,
    date: date,
    nroAsociado: nroAsociado,
    setState: setState,
  };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;
