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

function Cart() {
  const { cartState, removeAll, date } = useContext(CartContext);

  const handleDeleteAll = () => {
    removeAll();
  };
  const [print, setPrint] = useState(false);

  // useEffect(() => {
  //   setTimeout(() =>{
  //   clientName("");}
  //   ,500);
  // },[handlePrint]);

  const [edit, setEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Paper
      className="itemCart"
      sx={{ height: "85vh", width: "45vw", display: "flex", flexWrap: "wrap" }}
    >
      <Box>
        <PrinteableProducts
          print={print}
          edit={edit}
          products={cartState.products}
          client={"jero"}
          setPrint={setPrint}
        />
        <Divider />
        <Box display="flex" justifyContent="space-around" alignItems="center">
          {/* <Button color="success" variant="contained" onClick={handleSaveSale}>
            Vender
          </Button> */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenModal(!openModal)}
          >
            A Cuenta
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
