export const USER_URL = user => USERS_URL + "/" + user.username;
export const BOARDS_URL = "/boards";
export const BOARD_URL = board => BOARDS_URL + "/" + board.label;
export const THREAD_URL = (thread, board) =>
  BOARD_URL(board) + "/" + thread.originalPost.postNumber;

export const USERS_URL = "/users";
export const LOGIN_URL = "/login";
export const LOGOUT_URL = "/logout";
export const DASHBOARD_URL = "/dashboard";
