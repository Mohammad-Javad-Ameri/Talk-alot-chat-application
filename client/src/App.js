import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Navbar/Header";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newmessage, setNewMessages] = useState({});
  const user = useSelector((state) => state.user);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
        newmessage,
        setNewMessages,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
