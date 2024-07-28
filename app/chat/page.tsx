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
        {selectedRoom.room ? (
          <Chat />
        ) : (
          <div className="flex items-center justify-center min-h-screen w-full bg-white text-gray-700">
            <div className="bg-white p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">
                Select a Room or Join a New Room
              </h2>
              <p className="text-gray-500">
                From the left sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
