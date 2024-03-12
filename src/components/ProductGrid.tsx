import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Product from "../models/Product";
import { useContext } from "react";
import { CartContext } from "./cart/context/CartContext";

interface propsGrid {
  products: Product[];
  openCart: boolean;
}

const ProductGrid = ({ products, openCart }: propsGrid) => {
  const { addItem } = useContext(CartContext);
  const columns: GridColDef[] = [
    {
      field: "cod",
      headerName: "Codigo",
      headerClassName: "header-grid",
      width: openCart ? 70 : 120,
      minWidth: 70,
    },
    {
      field: "description",
      headerName: "Descripcion",
      headerClassName: "header-grid",
      width: openCart ? 350 : 700,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Marca",
      headerClassName: "header-grid",
      width: openCart ? 100 : 350,
      editable: true,
    },
    {
      field: "price",
      headerName: "Precio",
      headerClassName: "header-grid",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  return (
    <DataGrid
      sx={{
        height: "75vh",
        width: "95%",
        boxShadow: 2,
      }}
      className="products-grid"
      density="standard"
      rows={products}
      columns={columns}
      pageSizeOptions={[5, 10, 25]}
      onRowSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        products
          .filter((row) => selectedIDs.has(row.id))
          .map((row) => {
            addItem(row);
          });
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
    />
  );
};

export default ProductGrid;
