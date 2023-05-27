import React from "react";
import Sidebar from "../components/chat/Sidebar";
import MessageForm from "../components/chat/MessageForm";

function Chat() {
    return (
        <div className="flex">
            <div className="w-1/3">
                <Sidebar />
            </div>
            <div className="w-2/3">
                <MessageForm />
            </div>
        </div>
    );
}

export default Chat;