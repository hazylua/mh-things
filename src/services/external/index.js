import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://mhw-db.com",
    timeout: 10000,
  });
};
