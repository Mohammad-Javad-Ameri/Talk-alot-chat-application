import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import { HiPaperAirplane } from "react-icons/hi";

export default function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);

  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

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
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }

  return (
    <div className="border rounded-2xl">
      <div className="h-[81vh] border-b-2  overflow-y-scroll">
        {user && !privateMemberMsg?._id && (
          <div className="alert  shadow-lg justify-center">
            You are in the {currentRoom} room
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div
              class="alert rounded-none shadow-lg justify-center"
              role="alert"
            >
              <div>
                Your conversation with {privateMemberMsg.name}{" "}
                <img
                  src={privateMemberMsg.picture}
                  className="w-[60px] h-[60px] object-cover mx-[10px] my-auto mb-[30px] rounded-[50%] ml-[10px]"
                />
              </div>
            </div>
          </>
        )}
        {!user && (
          <div className="alert alert-danger text-red-500 justify-center">
            Please login
          </div>
        )}

        {user &&
          messages.map(({ _id: date, messageBydate }, idx) => (
            <div key={idx}>
              <p className="flex rounded-none mt-2  justify-center">{date}</p>
              {messageBydate?.map(({ content, time, from: sender }, msgIdx) => (
                <div
                  className={
                    sender?.email === user?.email
                      ? "chat chat-end "
                      : "chat chat-start  "
                  }
                  key={msgIdx}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={sender.picture} />
                    </div>
                  </div>
                  <div className="chat-header">
                    {sender._id == user?._id ? "You" : sender.name}
                    <time className="text-xs opacity-50 mx-1">{time}</time>
                  </div>
                  <div
                    className={
                      sender?.email === user?.email
                        ? "chat-bubble chat-bubble-warning"
                        : "chat-bubble chat-bubble-info"
                    }
                  >
                    <p className="">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit} className=" px-4 py-[5px]">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Your message"
            disabled={!user}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input input-bordered w-[92%]  flex-grow mr-2  rounded-full  "
          />
          <button
            type="submit"
            className="  border-2 hover:text-white hover:bg-gray-700 dark:hover:bg-slate-800 dark:hover:text-white  rounded-full w-10 h-10 text-2xl flex items-center justify-center outline-none"
            disabled={!user}
          >
            <HiPaperAirplane />
          </button>
        </div>
      </form>
    </div>
  );
}
