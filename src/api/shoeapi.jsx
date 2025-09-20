import axios from "axios";

const shoeApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/shoe/`, // uses env var
});

export default shoeApi;
