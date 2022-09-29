import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  console.log(process.env)
  return (
    <>
      <AppRoutes></AppRoutes>
      <ToastContainer />
    </>
  );
}

export default App;
