import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
