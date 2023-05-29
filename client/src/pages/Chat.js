import React from "react";
import Sidebar from "../components/chat/Sidebar";
import MessageForm from "../components/chat/MessageForm";

function Chat() {
  return (
    <div className=" flex flex-wrap  h-[92%]">
      <div className="w-1/3 max-sm:w-full">
        <Sidebar />
      </div>
      <div className="w-2/3 max-sm:w-full">
        <MessageForm />
      </div>
    </div>
  );
}

export default Chat;
