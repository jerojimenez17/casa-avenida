/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";

interface props {
  handleSetSearch: (search: string) => void;
}

const SearchProduct = ({ handleSetSearch }: props) => {
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSetSearch(e.target.value);
    }
  };
  const handleSearch = (e: any) => {
    if (e.target.value === "") {
      handleSetSearch("");
    }
  };
  return (
    <TextField
      sx={{
        maxWidth: "20%",
        minWidth: "20%",
        maxHeight: "1.5rem",
        height: "1.5rem",
        ml: 2,
        mb: 3,
      }}
      variant="outlined"
      label="Buscar"
      color="primary"
      onKeyDown={handleKeyPress}
      onChange={handleSearch}
    />
  );
};

export default SearchProduct;
