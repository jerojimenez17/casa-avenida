import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface props {
  handleSetListName: (name: string) => void;
  listName: string;
}

const lists = [
  "Taladro",
  "Prohunter",
  "Fabian Pinceles",
  "Cerrajeria",
  "Casa Blanca",
  "Las Colonias",
  "Masterguil",
  "Las Colonias Tanzas",
  "Gonzalo Galan",
  "Megalux",
  "Bairespack Varas",
  "Bairespack PasaHilos",
  "Belmo",
];
const ListSelect = ({ handleSetListName, listName }: props) => {
  return (
    <FormControl
      color="primary"
      sx={{
        minWidth: 200,
        display: "flex",
        mt: 1,
        justifyContent: "center",
      }}
    >
      <InputLabel
        color="primary"
        sx={{
          ml: 2,
          mb: 1,
        }}
        id="demo-simple-select-helper-label"
      >
        Listas
      </InputLabel>
      <Select
        color="primary"
        labelId="lists-label"
        id="list-selector"
        value={listName}
        variant="outlined"
        sx={{
          maxHeight: "40px",
          height: "40px",
          ml: 2,
          mb: 1,
        }}
        label="Listas"
        onChange={(e: SelectChangeEvent<string>) =>
          handleSetListName(e.target.value)
        }
      >
        {lists.map((list) => (
          <MenuItem value={list.replace(/\s/g, "").toLowerCase()}>
            {list}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ListSelect;
