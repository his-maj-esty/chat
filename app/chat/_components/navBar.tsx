import { roomSelectedState } from "@/app/states/chat";
import { useRecoilValue } from "recoil";
import { MembersDropdown } from "./members";

export function NavBar() {
  const selectedRoom = useRecoilValue(roomSelectedState);
  return (
    <div className="flex justify-between p-5">
      <div className="text-lg">{selectedRoom.room}</div>
      <div>
        <MembersDropdown />
      </div>
    </div>
  );
}
