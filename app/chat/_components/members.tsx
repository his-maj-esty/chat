import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { refetchMembersState, roomSelectedState } from "@/app/states/chat";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { fetchUsersByRoom } from "../actions";
import { set } from "react-hook-form";

export function MembersDropdown() {
  const selectedRoom = useRecoilValue(roomSelectedState);
  const [members, setMembers] = useState<UserSession[]>([]);

  useEffect(() => {
    setMembers([]);
    async function fetch() {
      const fetchedMembers = await fetchUsersByRoom(selectedRoom.room!);
      setMembers(fetchedMembers);
    }
    fetch();
  }, [refetchMembersState, selectedRoom]);

  useEffect(() => {
    setMembers([]);

    async function fetch() {
      const fetchedMembers = await fetchUsersByRoom(selectedRoom.room!);
      setMembers(fetchedMembers);
    }
    fetch();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Members</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Room Members</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {members.map((member) => (
            <DropdownMenuItem>
              <div className="flex space-x-4 items-center">
                <User className="mr-2 h-4 w-4" />
                <div>{member.username}</div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
