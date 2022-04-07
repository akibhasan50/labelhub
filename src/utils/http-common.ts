import axios from "axios";
export default axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8000/api",
=======
  baseURL: "http://localhost:8080/api",
>>>>>>> feature
  headers: {
    "Content-type": "application/json",
  },
});
