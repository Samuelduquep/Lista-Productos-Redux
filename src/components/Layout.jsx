import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="">
      <div className="">
        <Header />
      </div>
      <main className="container mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
