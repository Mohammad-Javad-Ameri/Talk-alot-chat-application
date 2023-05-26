import logo from "../../assets/logo1.png";
import { useState } from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import ProfileDropdown from "./ProfileDropDown";
import DarkMode from "./Darkmode";
import { Link } from "react-router-dom";
export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMobileNav = () => {
    setOpen(!open);
  };

  return (
    <div className="flex justify-between max-[360px]:justify-start items-center">
      <div className="">
        <MobileNav open={open} toggleMobileNav={toggleMobileNav} />
        <Link to="/">
        <div className="btn btn-ghost m-0 p-0" onClick={toggleMobileNav}>
          <img src={logo} className="w-9" />
          <p className=" normal-case text-xl max-[360px]:hidden">Talk A Lot</p>
        </div>
        </Link>
        <DarkMode />
      </div>
      <Navbar />

      <ProfileDropdown />
    </div>
  );
}
