import { atom } from "recoil";

export const roomSelectedState = atom<{ room: string | null }>({
  key: "roomSelectedState",
  default: {
    room: null,
  },
});

export const refetchRoomsState = atom<boolean>({
  key: "refetchRoomsState",
  default: false,
});

export const refetchMembersState = atom<boolean>({
  key: "refetchMembersState",
  default: false,
});
