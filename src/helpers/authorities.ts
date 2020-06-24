import { useContext } from "react";
import { AuthContext } from "../components/App";
import { UserAuthority } from "../types";

export default function useAuthority(authority: UserAuthority) {
  const { user } = useContext(AuthContext);
  return user && user.authorities && user.authorities.includes(authority);
}
