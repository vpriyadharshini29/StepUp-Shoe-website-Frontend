import axios from "axios";

const shoeApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/shoe/`, // uses env var
});

export default shoeApi;
