import { useContext } from "react";
import { AppContext } from "../components/App";
import { UserAuthority } from "../types";

export default function useAuthority(authority: UserAuthority) {
  const { user } = useContext(AppContext);
  return user && user.authorities && user.authorities.includes(authority);
}
