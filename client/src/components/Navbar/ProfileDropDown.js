import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLogoutUserMutation } from "../../services/appApi";
import { useSelector } from "react-redux";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);
  const [logoutUser] = useLogoutUserMutation();
  const toggleDropdown = () => {
    setOpen(!open);
  };

  async function handleLogout(e) {
    e.preventDefault();
    await logoutUser(user);

    window.location.replace("/");
  }

  if (!user) {
    return (
      <Link to="/login" class="py-1 pr-2">
        <button className="btn btn-outline ">Login</button>
      </Link>
    );
  }

  return (
    <div className="">
      <div className="mr-20">
        <div
          onClick={toggleDropdown}
          className={`relative border-b-4 border-transparent py-3 ${
            open ? "border-amber-500  transition duration-300" : ""
          }`}
        >
          <div className="flex justify-center items-center space-x-3  cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden border-[1px]  border-gray-900">
              <img
                src={user.picture}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-semibold max-[550px]:hidden ">
              <div className="cursor-pointer   ">Hi {user.name}!</div>
            </div>
          </div>
          {open && (
            <div className="fixed px-5 py-3  bg-white rounded-lg shadow border">
              <ul className="space-y-3 ">
                <li className="">
                  <a
                    href="#"
                    className="flex  items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-orange-500"
                  >
                    <div className="mr-3">
                      <BsPerson />
                    </div>
                    Account
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-orange-500"
                  >
                    <div className="mr-3">
                      <AiOutlineSetting />
                    </div>
                    Setting
                  </a>
                </li>
                <hr className="" />
                <li className="ransform transition-colors duration-200 border-transparent hover:border-red-600">
                  <div
                    className="mr-3 flex items-center cursor-pointer  text-red-600"
                    onClick={handleLogout}
                  >
                    <HiOutlineLogout />
                  </div>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
