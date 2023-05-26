import { Link } from "react-router-dom";

export default function MobileNav({ open, toggleMobileNav }) {
  return (
    <div className="dropdown">
      <label
        tabIndex={0}
        className="btn btn-ghost px-2 m-0 lg:hidden"
        onClick={toggleMobileNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      {open && (
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <Link to="/" className=" ">
            <li>home</li>
          </Link>
          <Link to="/chat" className=" ">
            <li>chat</li>
          </Link>
        </ul>
      )}
    </div>
  );
}
