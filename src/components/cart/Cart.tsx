import { useContext, useState } from "react";
// import { CartContext } from "./context/CartContext";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { DeleteSharp, EditSharp } from "@mui/icons-material";
import PrinteableProducts from "../PrinteableProducts";
import { CartContext } from "./context/CartContext";
import { addProductsToStock } from "../../services/Firebase";
function Cart() {
  const { cartState, removeAll, date } = useContext(CartContext);
  const [print, setPrint] = useState(false);

  const handleDeleteAll = () => {
    removeAll();
  };

  const handleSaveSale = async () => {
    await addProductsToStock(cartState.products);
    handleDeleteAll();
  };
  // useEffect(() => {

  //   setTimeout(() =>{
  //   clientName("");}
  //   ,500);
  // },[handlePrint]);

  const [edit, setEdit] = useState<boolean>(false);

  return (
    <Paper>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        flexWrap="wrap"
      >
        <PrinteableProducts
          print={print}
          edit={edit}
          products={cartState.products}
          setPrint={setPrint}
        />
        <Divider />
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          p={0.2}
        >
          <Button
            color="success"
            variant="contained"
            size="small"
            onClick={handleSaveSale}
          >
            Vender
          </Button>

          <Tooltip title={"Vaciar"}>
            <IconButton onClick={handleDeleteAll} color="error">
              <DeleteSharp />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Editar"}>
            <IconButton onClick={() => setEdit(!edit)} color="primary">
              <EditSharp />
            </IconButton>
          </Tooltip>

          <Tooltip title={"Imprimir"}>
            <IconButton
              onClick={() => {
                date(new Date());
                setPrint(!print);
              }}
              color="success"
              onClickCapture={() => {
                edit && setEdit(!edit);
              }}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}

export default Cart;
