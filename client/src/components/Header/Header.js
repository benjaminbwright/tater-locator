import { Navbar } from "react-materialize";
import Brand from "../Brand/Brand.js";

const Header = () => {
  return (
    <Navbar
      className="navbar-fixed"
      brand={<Brand />}
      centerLogo
      alignLinks="left"
    ></Navbar>
  );
};

export default Header;
