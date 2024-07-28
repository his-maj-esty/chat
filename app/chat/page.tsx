"use client";
import { Chat } from "./_components/chat";
import Rooms from "./_components/rooms";
import { roomSelectedState } from "../states/chat";
import { useRecoilValue } from "recoil";

export default function Page() {
  const selectedRoom = useRecoilValue(roomSelectedState);
  return (
    <div className="flex flex-row">
      <Rooms />
      <div className="flex-grow">
        {selectedRoom.room ? <Chat /> : <div>noRoomSelected</div>}
      </div>
    </div>
  );
}
