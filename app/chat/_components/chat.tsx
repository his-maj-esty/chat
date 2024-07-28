"use client";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { fetchMessages, sendMessage } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { refetchMembersState, roomSelectedState } from "../../states/chat";
import { NavBar } from "./navBar";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function Chat() {
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<UserSession | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const selectedRoom = useRecoilValue(roomSelectedState);
  const setRefetchMembers = useSetRecoilState(refetchMembersState);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setInitialMessages([]);

        const response = await fetchMessages({ room: selectedRoom.room! });
        setInitialMessages(response.messages);
        setUser(response.user);
      } catch (err: any) {
        toast.error("Failed to fetch messages");
      }
    };

    fetch();
  }, [selectedRoom]);

  useEffect(() => {
    if (!user || !selectedRoom.room) return;

    const socket = io(SERVER_URL!, {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_FRONTEND_URL!,
      },
    });

    socket.on("connect", async () => {
      await sendMessage({
        content: "",
        room: selectedRoom.room!,
        username: user.username,
        type: "join",
        timestamp: new Date(),
      });
    });

    socket.on(`${selectedRoom.room!}:members`, (data) => {
      setRefetchMembers((prev) => !prev);
    });

    socket.on(`${selectedRoom.room!}:message`, (data: { data: Message }) => {
      setInitialMessages((prev) => [...prev, data.data]);
    });

    const handleDisconnect = async () => {
      await sendMessage({
        content: "",
        room: selectedRoom.room!,
        username: user.username,
        type: "leave",
        timestamp: new Date(),
      });
    };

    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect");
      socket.off(`${selectedRoom.room!}:message`);
      socket.off("disconnect", handleDisconnect);
      socket.close();
    };
  }, [selectedRoom.room, user]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [initialMessages]);

  const handleSend = async () => {
    if (messageContent.trim() === "") {
      return;
    }

    try {
      await sendMessage({
        content: messageContent,
        room: selectedRoom.room!,
        username: user?.username!,
        type: "message",
        timestamp: new Date(),
      });
      setMessageContent("");
    } catch (err: any) {
      toast.error("Failed to send message");
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gray-300 min-h-screen max-h-screen flex flex-col">
      <div>
        <NavBar></NavBar>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {initialMessages.map((message) => (
          <MessageBox
            id={message.content}
            position={user.username === message.username ? "right" : "left"}
            text={message.content}
            title={message.username}
            focus={true}
            date={new Date(message.timestamp)}
            titleColor="blue"
            forwarded={false}
            replyButton={false}
            removeButton={false}
            status="sent"
            statusTitle="Sent"
            notch={false}
            retracted={false}
            type="text"
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white">
        <div className="flex">
          <Input
            placeholder="Type here..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button onClick={handleSend} className="whitespace-nowrap">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
