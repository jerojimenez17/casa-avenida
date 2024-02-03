import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import { CartContext } from "../cart/context/CartContext";
import { Link } from "react-router-dom";
import SwitchDarkMode from "./SwitchDarkMode";
import { CartContext } from "./cart/context/CartContext";

interface SearchAppBarProps {
  openDrawer: () => void;
  handleSearchText: (text: string) => void;
  searchText: string;
  setOpenCart: (value: boolean) => void;
  openCart: boolean;
  page: string;
  handlePageChange: React.Dispatch<React.SetStateAction<string>>;
  themeMode: boolean;
  handleTheme: () => void;
}

export default function SearchAppBar({
  openDrawer,
  setOpenCart,
  page,
  handlePageChange,
  openCart,
  themeMode,
  handleTheme,
}: SearchAppBarProps) {
  const { cartState } = React.useContext(CartContext);
  React.useEffect(() => {
    console.log(page);
  });
  return (
    <AppBar
      className=""
      position="static"
      color="inherit"
      component="nav"
      sx={{ margin: 0 }}
    >
      <Container>
        <Toolbar disableGutters>
          <IconButton
            size="large"
            className="menu-button"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}
            alignItems="center"
          >
            <Box
              display="flex"
              borderBottom={
                page === "products" || page === "" ? "2px solid blue" : "none"
              }
              alignContent="center"
              alignItems="center"
            >
              <Link
                to="products"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => {
                  handlePageChange("products");
                }}
              >
                <Button
                  variant="text"
                  size="large"
                  color={
                    page === "products" || page === "" ? "primary" : "inherit"
                  }
                >
                  Productos
                </Button>
              </Link>
            </Box>
            <Box
              display="flex"
              borderBottom={page === "counts" ? "3px solid blue" : "none"}
              alignContent="center"
              textAlign="center"
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="counts"
                onClick={() => {
                  handlePageChange("counts");
                }}
              >
                <Button
                  variant="text"
                  size="large"
                  color={page === "counts" ? "primary" : "inherit"}
                >
                  Cuentas
                </Button>
              </Link>
            </Box>
          </Box>
          <Typography
            className="flex"
            justifyContent="center"
            color="primary"
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
            }}
          >
            Casa Avenida
          </Typography>
          <SwitchDarkMode themeMode={themeMode} handleThemeMode={handleTheme} />
          <IconButton
            color={openCart ? "primary" : "default"}
            onClick={() => {
              setOpenCart(!openCart);
            }}
          >
            <Badge badgeContent={cartState.products.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
