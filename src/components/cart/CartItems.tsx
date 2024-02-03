import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import React, { KeyboardEvent, useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import Product from "../../models/Product";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  products: Product[];
  edit: boolean;
  count?: boolean;
  documentId?: string;
  setDocToChange?: React.Dispatch<React.SetStateAction<string>>;
}

const CartItems = ({ edit, products }: props) => {
  const { addUnit, removeUnit, removeItem, changePrice, changeAmount } =
    useContext(CartContext);
  const [editPrice, setEditPrice] = useState(0);
  const handleAddItem = (producto: Product) => {
    addUnit(producto);
  };
  const handleRemoveUnit = (producto: Product) => {
    removeUnit(producto);
  };
  const handleRemoveItem = (product: Product) => {
    removeItem(product);
  };

  const handleEditPrice = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    product: Product
  ) => {
    if (e.key === "Enter") {
      product.price = editPrice;

      changePrice(product);
    }
  };
  const handleEditAmount = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    product: Product
  ) => {
    if (e.key === "Enter") {
      console.log(e);
      product.amount = 1;
      changeAmount(product);
    }
  };

  return (
    <TableContainer className="cart-container" component={Paper}>
      <Table className="table" size="medium" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Descripcion</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Subtotal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {products.map((producto: Product) => (
          <TableRow key={producto.id} className="cart-row">
            <TableCell className="description">
              {producto.description}
            </TableCell>
            <TableCell className="marca">{producto.brand}</TableCell>
            {edit ? (
              <TableCell>
                <TextField
                  size="small"
                  className="input-edit-amount"
                  placeholder={producto.amount.toString()}
                  onKeyDown={(e) => {
                    handleEditAmount(e, producto);
                  }}
                />
              </TableCell>
            ) : (
              <TableCell className="cantidad"> {producto.amount}</TableCell>
            )}
            {edit ? (
              <TableCell>
                <TextField
                  size="small"
                  className="input-edit-price"
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  onKeyDown={(e) => {
                    handleEditPrice(e, producto);
                  }}
                  placeholder={"$" + Number(producto.price).toFixed()}
                />
              </TableCell>
            ) : (
              <TableCell>{"$" + Number(producto.price).toFixed()}</TableCell>
            )}
            <TableCell className="SubTotal">
              {" "}
              ${(producto.amount * producto.price).toFixed()}
            </TableCell>
            <TableCell>
              {edit && (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                >
                  <IconButton
                    size="small"
                    color="success"
                    aria-label="addItem"
                    onClick={() => handleAddItem(producto)}
                  >
                    <AddCircle />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    aria-label="removeUnit"
                    onClick={() => handleRemoveUnit(producto)}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    aria-label="removeItem"
                    onClick={() => handleRemoveItem(producto)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default CartItems;
