import {FaSun,FaMoon} from "react-icons/fa"
import { useState,useEffect } from "react";


export default function DarkMode(){

      const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  
    const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

    useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);


    return (
                <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              
              checked={theme === "light" ? false : true}
            />
            
            <FaSun  className="w-6 h-6 swap-on" />
           
            <FaMoon  className="w-6 h-6 swap-off" />
          </label>
        </button>
    )
}