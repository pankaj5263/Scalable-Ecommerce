import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
    console.log("Layout");
  return (
    <>
      <Header />
      <div className="mt-10">
          <Outlet/>
      </div>
      
    </>
  );
};

export default Layout;
