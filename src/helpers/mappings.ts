import { BoardType, ThreadType, UserType } from "../types";

export const USER_URL = (user: UserType) => USERS_URL + "/" + user.username;
export const BOARDS_URL = "/boards";
export const BOARD_URL = (board: BoardType) => BOARDS_URL + "/" + board.label;
export const BOARD_CATALOG_URL = (board: BoardType) =>
  BOARD_URL(board) + "/catalog";
export const THREAD_URL = (thread: ThreadType, board: BoardType) =>
  BOARD_URL(board) + "/" + thread.originalPost.postNumber;

export const USERS_URL = "/users";
export const LOGIN_URL = "/login";
export const LOGOUT_URL = "/logout";
export const DASHBOARD_URL = "/dashboard";
