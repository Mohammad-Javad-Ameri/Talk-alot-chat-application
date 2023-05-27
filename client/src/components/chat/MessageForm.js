import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {AppContext} from "../../context/appContext"

export default function MessageForm(){
        const [message, setMessage] = useState("");
    const user = useSelector((state) => state.user);
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);
    const messageEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const time = today.getHours() + ":" + minutes;
        const roomId = currentRoom;
        socket.emit("message-room", roomId, message, time, todayDate);
        setMessage("");
    }

    return (
        <div className="h-[80vh] overflow-y-scroll border-[1px] border-solid border-gray-100 mb-5">
  <div className="flex-grow overflow-auto">
    {user && !privateMemberMsg?._id && (
      <div className="bg-blue-100 text-blue-800 px-4 py-2">
        You are in the {currentRoom} room
      </div>
    )}
    {user && privateMemberMsg?._id && (
      <div className="bg-blue-100 text-blue-800 px-4 py-2">
        <div className="p-0 mx-0 my-auto text-center h-[100px]">
          <div className="">
            Your conversation with {privateMemberMsg.name}
          </div>
          <img src={privateMemberMsg.picture} className="w-[60px] h-[60px] object-cover mx-[10px] my-auto mb-[30px] rounded-[50%] ml-[10px]" />
        </div>
      </div>
    )}
    {!user && (
      <div className="border border-red-500  px-4 py-2">
        Please login
      </div>
    )}
    {user &&
      messages.map(({ _id: date, messagesByDate }, idx) => (
        <div key={idx}>
          <p className="bg-gray-200 text-gray-700 px-4 py-2 text-center">
            {date}
          </p>
          {messagesByDate?.map(
            ({ content, time, from: sender }, msgIdx) => (
              <div                  className={
                    sender?.email == user?.email
                      ? "flex justify-end mb-2"
                      : "flex justify-start mb-2"
                  }
                  key={msgIdx}
                >
                  <div
                    className={
                      sender?.email == user?.email
                        ? "bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs break-all"
                        : "bg-gray-200 text-gray-700 rounded-lg px-4 py-2 max-w-xs break-all"
                    }
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={sender.picture}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <p className="text-sm font-medium">
                        {sender._id == user?._id ? "You" : sender.name}
                      </p>
                    </div>
                    <p className="text-sm">{content}</p>
                    <p className="text-xs text-gray-600 mt-1 text-right">
                      {time}
                    </p>
                  </div>
                </div>
              )
            )}
        </div>
      ))}
    <div ref={messageEndRef} />
  </div>
  <form onSubmit={handleSubmit} className="bg-gray-100 px-4 py-2">
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Your message"
        disabled={!user}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow mr-2 bg-white rounded-full px-4 py-2 outline-none"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center outline-none"
        disabled={!user}
      >
        <i className="fas fa-paper-plane"></i>
      </button>
    </div>
  </form>
</div>
    )
}