import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.jpg";
import { useSignupUserMutation } from "../services/appApi";
import logo from "../assets/logo1.png";
import { FiUpload } from "react-icons/fi";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    if (password !== confirmPassword) {
  return alert("Passwords do not match");
}

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const base64String = reader.result;
      signupUser({ name, email, password, picture: base64String }).then(
        ({ data }) => {
          if (data) {
            navigate("/");
          }
        }
      );
    };
  }

  return (
    <section className=" min-h-[92vh] flex bg-base-200 items-center justify-center">
      <div className=" flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl ">Register</h2>
          <p className="text-xs mt-4 ">
            If you're new here, simply create an account by filling out a form.
          </p>
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="">
              <div className="flex mt-3 justify-center place-items-end ">
                <img
                  src={imagePreview || logo}
                  className="w-[80px]   rounded-[50%] border-2 border-solid object-cover h-[80px]"
                />
                <label htmlFor="image-upload" className="image-upload-label">
                  <FiUpload className=" bottom-0 flex  right-[10px] cursor-pointer -m-4" />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={validateImg}
                />
              </div>

              <input
                className="p-2 mt-8 rounded-xl border w-full"
                type="name"
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="">
              <input
                className="p-2 rounded-xl border w-full"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            {error && (
              <p className="alert text-red-500">{error.data.message}</p>
            )}
            {}
            <button className="btn btn-outline rounded-xl  py-2 hover:scale-105 duration-300">
              Register
            </button>
          </form>
          <div className="mt-5 text-xs border-b hidden  py-4 ">
            <a href="#">Forgot your password?</a>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center ">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className=" btn btn-outline  rounded-xl hover:scale-110 duration-300">
                {isLoading ? "Signing you up..." : "Signup"}
              </button>
            </Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img class="rounded-2xl" alt="login" src={signup}></img>
        </div>
      </div>
    </section>
  );
}
