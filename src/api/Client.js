import axios from "axios";
axios
  .create({ baseURL: "http://localhost:8080/" })
  .interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("user")).token
      }`;
    }

    return req;
  });
export default axios.create({ baseURL: "http://localhost:8080/" });
