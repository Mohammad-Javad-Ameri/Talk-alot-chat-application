import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-center hidden  lg:flex">
      <ul className="menu menu-horizontal  px-1">
        <Link
          to="/"
          className=" hover:rounded hover:text-amber-400 px-3 py-1 transition"
        >
          <li tabIndex={0}>home</li>
        </Link>

        <Link
          to="/chat"
          className=" hover:rounded hover:text-amber-400  px-3 py-1 transition"
        >
          <li>chat</li>
        </Link>
      </ul>
    </div>
  );
}
