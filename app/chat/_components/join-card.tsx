import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { joinRoom } from "../actions";
import { revalidatePath } from "next/cache";
import { useSetRecoilState } from "recoil";
import { refetchRoomsState } from "@/app/states/chat";

export function CreateOrJoinCard({ user }: { user: UserSession }) {
  const [roomName, setRoomName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const setRefetchRooms = useSetRecoilState(refetchRoomsState);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await joinRoom({ room: roomName, username: user.username });
      setRefetchRooms((prev) => !prev);
      toast.success("Room joined successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to join the room.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"sm"}>Create or Join Room</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create or Join Room</AlertDialogTitle>
          <AlertDialogDescription>
            Join existing or create a new Room.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Room</Label>
            <Input
              id="name"
              placeholder="Name of the Room"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <AlertDialogFooter className="flex justify-between">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
