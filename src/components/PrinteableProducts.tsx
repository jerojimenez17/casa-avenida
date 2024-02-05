import {
  Box,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import Product from "../models/Product";
import CartItems from "./cart/CartItems";
import { CartContext } from "./cart/context/CartContext";
import logo from "../../public/logo.png";

interface PrinteableProductsProps {
  edit: boolean;
  reference?: MutableRefObject<null>;
  print?: boolean;
  products: Product[];
  date?: Date;
  client?: string;
  setPrint?: React.Dispatch<React.SetStateAction<boolean>>;
  documentId?: string;
  setDocToChange?: React.Dispatch<React.SetStateAction<string>>;
}
const PrinteableProducts = ({
  edit,
  reference,
  print,
  setPrint,
  date,
  documentId,
  products,
  setDocToChange,
}: PrinteableProductsProps) => {
  const [discountState, setDiscountState] = useState(0);

  const { cartState, discount } = useContext(CartContext);
  const ref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  useEffect(() => {
    if (print && setPrint) {
      handlePrint();
      setPrint(!print);
    }
  }, [print]);

  const handleDiscount = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (e) {
        console.log(e);
        setDiscountState(0);
      }
      discount(discountState);
    }
  };

  return (
    <Box ref={reference ? reference : ref} className="printeable-cart">
      <Box m={1} className="cart">
        <Box display="flex" flexDirection="column">
          <Box className="logo">
            {/* <Typography
              variant="h4"
              className="title-card"
              color="primary"
              ml={2}
            >
              Casa Avenida
            </Typography> */}
            <img className="img-logo" alt="Casa Avenida" src={logo} />
          </Box>
          <Box className="date-container">
            <Typography variant="body1" className="date">
              Fecha:{cartState.date.toLocaleDateString()}{" "}
              {cartState.date.toLocaleTimeString()}
            </Typography>
            {/* {cartState.CAE?.CAE !== "" && (
              <Typography
                variant="body1"
                sx={{ marginTop: "2rem" }}
                className="document-container"
              >
                Comprobante: 0005-
                {cartState.CAE?.nroComprobante.toString().padStart(8, "0")}
              </Typography>
            )} */}
          </Box>
          {/* {cartState.CAE?.CAE !== "" && (
            <>
              <Box>
                <Typography
                  variant="h4"
                  className="C"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: "40%",
                    border: "1px solid",
                    margin: "1rem",
                  }}
                >
                  C
                </Typography>
              </Box>
            </>
          )} */}
          <div className="store-data">
            {/* {cartState.CAE?.CAE !== "" && (
              <Box mt={2}>
                <Typography variant="body2" className="document-container">
                  CUIT del emisor: 20299735401{" "}
                </Typography>
                <Typography variant="body2" className="document-container">
                  IIBB: 20299735401{" "}
                </Typography>
                <Typography variant="body2" className="document-container">
                  Nombre o Razon Social: Matias Jimenez{" "}
                </Typography>
                <Typography variant="body2" className="document-container">
                  Inicio de Actividades: 01/01/2007{" "}
                </Typography>
                <Typography variant="body2" className="document-container">
                  Responsable Monotributo
                </Typography>
              </Box>
            )} */}
          </div>
        </Box>

        <Divider />
        <Box className="products-cart">
          <CartItems
            edit={edit}
            products={products}
            count={date !== undefined}
            documentId={documentId}
            setDocToChange={setDocToChange}
          />
        </Box>

        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={2}
          className="cart-total-container"
        >
          {edit ? (
            <FormControl variant="standard">
              {/* <TextField
                variant="standard"
                label="Cliente"
                placeholder={cartState.client}
                aria-label="cliente"
                onKeyDown={handleClient}
              /> */}
              <FilledInput
                id="filled-adornment"
                onChange={(e) => setDiscountState(Number(e.target.value))}
                onKeyDown={(e) => handleDiscount(e)}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                aria-describedby="filled-weight-helper-info"
                inputProps={{
                  "aria-label": "descuento",
                }}
              />
              <FormHelperText id="filled-weight-helper-info">
                Descuento
              </FormHelperText>
            </FormControl>
          ) : (
            <Box ml={2} mt={2}>
              <Typography variant="body1">
                Descuento: {discountState}%
              </Typography>
            </Box>
          )}
          <Box mt={2}>
            <Typography variant="h5" color="primary" mr={2} ml={1}>
              Total: $
              {products
                .reduce((acc, cur) => acc + cur.price * cur.amount, 0)
                .toFixed()}
            </Typography>
            {discountState !== 0 && (
              <Typography
                variant="h5"
                className="title-card"
                color="primary"
                mr={1}
              >
                Tot. Descuento: $
                {(
                  cartState.products.reduce(
                    (acc, cur) => acc + cur.price * cur.amount,
                    0
                  ) -
                  cartState.products.reduce(
                    (acc, cur) => acc + cur.price * cur.amount,
                    0
                  ) *
                    discountState *
                    0.01
                ).toFixed()}
              </Typography>
            )}
            {/* {cartState.entrega !== undefined && cartState.entrega > 0 && (
              <Typography>Entrega : {cartState.entrega}</Typography>
            )} */}
          </Box>
          {/* {cartState.pago && <Typography variant="h4">Pago</Typography>} */}
        </Box>
        {/* {cartState.CAE?.CAE !== "" && (
          <Box className="CAE-container">
            <Box display="flex">
              {cartState.CAE?.qrData && (
                <img
                  style={{ maxHeight: "80px" }}
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&format=png&data="${cartState.CAE.qrData}`}
                  alt=""
                />
              )}
            </Box>
            <Box display="flex" p={3}>
              <Typography>CAE:{cartState.CAE?.CAE}</Typography>
              <Typography>
                Vencimiento del CAE: {cartState.CAE?.vencimiento}
              </Typography>
            </Box>
          </Box>
        )}
        {cartState.CAE?.CAE !== "" &&
          cartState.IVACondition === "Consumidor Final" && (
            <div className="final-paragraph">
              El crédito fiscal discriminado en el presente comprobante, sólo
              podrá ser computado a efectos del Régimen de Sostenimiento e
              Inclusión Fiscal para Pequeños Contribuyentes de la Ley N°27.618
            </div>
          )} */}
        <Divider />
      </Box>
    </Box>
  );
};

export default PrinteableProducts;
