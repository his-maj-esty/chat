import { RecoilRoot } from "recoil";

export const RecoilProvider = ({ children }: any) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
