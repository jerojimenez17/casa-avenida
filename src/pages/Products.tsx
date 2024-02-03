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

const Products = () => {
  const [search, setSearch] = useState<string>("");
  const [newGain, setNewGain] = useState(0);
  const [newIva, setNewIva] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsListName, setProductListName] = useState<string>("taladro");
  const { gain, iva, cartState } = React.useContext(CartContext);
  useEffect(() => {
    fetchProducts(productsListName, cartState.gain, cartState.iva).then(
      (products) => {
        setProducts(products);
      }
    );
  }, [productsListName, gain, iva]);

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
        <Box sx={{ minHeight: "8vh", display: "flex" }}>
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
            sx={{ width: "4rem" }}
            placeholder={cartState.gain.toString()}
            onChange={(e) => setNewGain(Number(e.target.value))}
            onKeyDown={handleKeyGainPress}
          />
          <TextField
            sx={{ width: "4rem" }}
            placeholder={cartState.iva.toString()}
            onChange={(e) => setNewIva(Number(e.target.value))}
            onKeyDown={handleKeyIvaPress}
          />
        </Box>
        <Grid container sx={{ margin: "1rem" }}>
          <Grid item xs={12} md={6}>
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
              openCart={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Cart />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Products;
