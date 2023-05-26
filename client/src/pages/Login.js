import { useState, useContext } from "react";
import login from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../context/appContext";
import { useLoginUserMutation } from "../services/appApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  function handleLogin(e) {
    e.preventDefault();
    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      }
    });
  }



  return (
    <section className=" min-h-[92vh] flex bg-base-200 items-center justify-center">
      <div className=" flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl ">Login</h2>
          <p className="text-xs mt-4 ">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button className="btn btn-outline rounded-xl  py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>
          <div className="mt-5 text-xs border-b hidden  py-4 ">
            <a href="#">Forgot your password?</a>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center ">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className=" btn btn-outline  rounded-xl hover:scale-110 duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img class="rounded-2xl" alt="login" src={login}></img>
        </div>
      </div>
    </section>
  );
}
