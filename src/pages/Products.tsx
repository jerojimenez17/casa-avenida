/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper, TextField } from "@mui/material";
import ProductGrid from "../components/ProductGrid";
import Cart from "../components/cart/Cart";
import { useEffect, useState } from "react";
import fetchProducts from "../services/ProductsService";
import Product from "../models/Product";
import ListSelect from "../components/ListSelect";
import SearchProduct from "../components/SearchProduct";
import { CartContext } from "../components/cart/context/CartContext";
import React from "react";

interface ProductProps {
  openCart: boolean;
}

const Products = ({ openCart }: ProductProps) => {
  const [search, setSearch] = useState<string>("");
  const [newGain, setNewGain] = useState(0);
  const [newIva, setNewIva] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsListName, setProductListName] = useState<string>("taladro");
  const { gain, iva, cartState } = React.useContext(CartContext);
  useEffect(() => {
    setProducts([]);
    fetchProducts(productsListName, cartState.gain, cartState.iva).then(
      (products) => {
        setProducts(products);
      }
    );
  }, [productsListName, cartState.gain, cartState.iva]);

  const handleKeyGainPress = (e: any) => {
    if (e.key === "Enter") {
      gain(newGain);
    }
  };
  const handleKeyIvaPress = (e: any) => {
    if (e.key === "Enter") {
      iva(newIva);
    }
  };
  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box display="flex" flexDirection="column">
        <Box sx={{ height: "6vh", display: "flex", margin: 1 }}>
          <ListSelect
            handleSetListName={(name) => setProductListName(name)}
            listName={productsListName}
          />
          <SearchProduct
            handleSetSearch={(search) => {
              setSearch(search);
            }}
          />
          <TextField
            label="Ganacia"
            sx={{ width: "4.5rem" }}
            placeholder={cartState.gain.toString()}
            onChange={(e) => setNewGain(Number(e.target.value))}
            onKeyDown={handleKeyGainPress}
          />
          <TextField
            label="IVA"
            sx={{ width: "4.5rem" }}
            placeholder={cartState.iva.toString()}
            onChange={(e) => setNewIva(Number(e.target.value))}
            onKeyDown={handleKeyIvaPress}
          />
        </Box>
        <Grid container sx={{ margin: "1rem" }}>
          <Grid item xs={12} md={openCart ? 6 : 12}>
            <ProductGrid
              products={products.filter((product) => {
                return (
                  product.description
                    ?.toString()
                    .toLocaleLowerCase()
                    .includes(search.toLowerCase()) ||
                  product.cod
                    ?.toString()
                    .toLocaleLowerCase()
                    .includes(search.toLowerCase()) ||
                  product.brand
                    ?.toString()
                    .toLocaleLowerCase()
                    .includes(search.toLowerCase())
                );
              })}
              openCart={openCart}
            />
          </Grid>
          <Grid
            item
            xs={openCart ? 12 : 0}
            md={openCart ? 6 : 0}
            hidden={!openCart}
          >
            <Cart />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Products;
