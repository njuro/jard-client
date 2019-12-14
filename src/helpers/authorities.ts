import { useContext } from "react";
import { AuthContext } from "../components/App";
import { UserAuthority } from "../types";

export function useAuthority(authority: UserAuthority) {
  const { user } = useContext(AuthContext);
  return user && user.authorities && user.authorities.includes(authority);
}
