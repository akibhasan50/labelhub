import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "./../Navbar/Navbar";
import "./Layout.css";
const Layout = () => {
  return (
    <section className="layout-wrapper">
      <main className="dashboard">
        <Sidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
      {/* <Footer></Footer> */}
    </section>
  );
};
export default Layout;
