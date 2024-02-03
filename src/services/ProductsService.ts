import axios from "axios";

const fetchProducts = async (route: string, gain: number, iva: number) => {
  try {
    const response = await axios.get(
      "http://localhost:3002/api/productos/" + route + "/" + gain + "/" + iva,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export default fetchProducts;
