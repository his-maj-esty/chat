"use client";

import { Button } from "@/components/ui/button";
import { Room } from "@/src/entities/models/room";
import { useEffect, useState } from "react";
import { fetchRooms } from "../actions";
import toast from "react-hot-toast";
import { ChatList } from "react-chat-elements";
import { CreateOrJoinCard } from "./join-card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refetchRoomsState, roomSelectedState } from "../../states/chat";
import { signOut } from "@/auth";

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [user, setUser] = useState<UserSession>();
  const refetchRooms = useRecoilValue(refetchRoomsState);
  const setSelectedRoom = useSetRecoilState(roomSelectedState);
  useEffect(() => {
    async function fetch() {
      try {
        const response = await fetchRooms();
        setRooms(response.rooms);
        setUser(response.user);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch rooms");
      }
    }
    fetch();
  }, [refetchRooms]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await fetchRooms();
        setRooms(response.rooms);
        setUser(response.user);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch rooms");
      }
    }
    fetch();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex justify-between p-5 space-x-9">
        <div className="text-xl font-bold mb-9">Chat App</div>
        <CreateOrJoinCard user={user!}></CreateOrJoinCard>
      </div>

      <div className="px-2">
        {rooms.map((room) => (
          <ChatList
            onClick={() => setSelectedRoom(room)}
            className="chat-list"
            id="chat-list"
            lazyLoadingImage={`https://picsum.photos/seed/${room.room}/500/500`}
            dataSource={[
              {
                id: "1",
                avatar: `https://picsum.photos/seed/${room.room}/500/500`,
                alt: room.room,
                title: room.room,
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
