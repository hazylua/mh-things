import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://yb00-mh-things-backend.herokuapp.com",
    timeout: 10000,
  });
};
