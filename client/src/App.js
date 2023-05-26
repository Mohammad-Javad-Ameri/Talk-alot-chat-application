import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Navbar/Header";
import Signup from "./pages/Signup";

function App() {
  return (
    <div >
      <Header />
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Home />}/>
      </Routes>
     

    </div>
  );
}

export default App;
