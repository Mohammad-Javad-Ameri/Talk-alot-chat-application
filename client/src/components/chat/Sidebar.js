import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/appContext";
import { addNotifications, resetNotifications } from "../../userSlice";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);
  console.log(user);
  function joinRoom(room, isPublic = true) {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }

    dispatch(resetNotifications(room));
  }

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) dispatch(addNotifications(room));
  });

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();

      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  function getRooms() {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }

  function orderIds(id1, id2) {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  }

  function handlePrivateMemberMsg(member) {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  }
  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2 className="mb-3">Available rooms</h2>
      <ul className="list-none">
        {rooms.map(
          (room, idx) => (
            console.log(user.newmessage),
            (
              <li
                key={idx}
                onClick={() => joinRoom(room)}
                className={`alert shadow-lg mb-3 cursor-pointer ${
                  room === currentRoom ? "text-warning" : ""
                } flex justify-between`}
              >
                {room}{" "}
                {currentRoom !== room && (
                  <span className=" badge badge-lg bg-white text-black ">
                    {user.newmessage[room]}
                  </span>
                )}
              </li>
            )
          )
        )}
      </ul>
      <h2 className="mt-5 mb-3">Members</h2>
      {members.map((member) => (
        <li
          key={member.id}
          className={`alert shadow-lg mb-3 cursor-pointer px-2 py-0  ${
            privateMemberMsg?._id === member?._id ? " " : ""
          } flex justify-between`}
          onClick={() => handlePrivateMemberMsg(member)}
          disabled={member._id === user._id}
        >
          <div className="  rounded-full w-16 h-16   relative mr-2">
            <div
              className={`${
                member.status === "online" ? `avatar online` : `avatar offline`
              }`}
            >
              <img
                src={member.picture}
                className="  rounded-[50%] object-cover"
              />
            </div>
          </div>
          <div>
            {member.name}
            {member._id === user?._id && " (You)"}
            {member.status === "offline" && " (Offline)"}
          </div>
          <div className=" ml-auto">
            <span className="badge badge-lg flex items-end bg-white text-black">
              {user.newmessage[orderIds(member._id, user._id)]}
            </span>
          </div>
        </li>
      ))}
    </>
  );
}

export default Sidebar;
