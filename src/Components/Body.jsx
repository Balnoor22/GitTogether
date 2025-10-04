import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
//Any children routes of Body will render in Outlet
const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet/>
      <Footer />
    </div>
  );
};

export default Body;
