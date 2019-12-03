import { useContext } from "react";
import { AuthContext } from "../components/App";

export const TOGGLE_STICKY_THREAD = "TOGGLE_STICKY_THREAD";
export const TOGGLE_LOCK_THREAD = "TOGGLE_LOCK_THREAD";
export const DELETE_POST = "DELETE_POST";

export function useAuthority(authority) {
  const { user } = useContext(AuthContext);
  return user && user.authorities && user.authorities.includes(authority);
}
