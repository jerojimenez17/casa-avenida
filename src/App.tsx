import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { blue, cyan, pink } from "@mui/material/colors";
import { Box, Paper } from "@mui/material";
import CartProvider from "./components/cart/context/CartProvider";
import { esES } from "@mui/x-data-grid";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(window.location.href.split("/")[3]);
  const [searchText, setSearchText] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [themeMode, setThemeMode] = useState(false);

  const handleTheme = () => {
    setThemeMode(!themeMode);
  };
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const theme = createTheme(
    {
      palette: {
        mode: themeMode ? "dark" : "light",
        primary: { main: cyan[400] },

        secondary: { main: pink[400] },
        action: {},
        text: {
          secondary: blue[400],
        },
      },
    },
    esES
  );
  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          sx={{ margin: 0, padding: 0 }}
        >
          <BrowserRouter>
            <CartProvider>
              <Header
                page={page}
                handlePageChange={setPage}
                openCart={openCart}
                setOpenCart={setOpenCart}
                openDrawer={handleOpenDrawer}
                handleSearchText={setSearchText}
                searchText={searchText}
                themeMode={themeMode}
                handleTheme={handleTheme}
              />
              <Routes>
                <Route path="/" element={<Products />} />
              </Routes>
            </CartProvider>
          </BrowserRouter>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
