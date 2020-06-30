import {
  AttachmentType,
  BanType,
  BoardType,
  PostType,
  ThreadType,
  UserType,
} from "../types";

export const USER_URL = (user: UserType) => `${USERS_URL}/${user.username}`;
export const BOARDS_URL = "/boards";
export const BOARD_URL = (board: BoardType) => `${BOARDS_URL}/${board.label}`;
export const BOARD_CATALOG_URL = (board: BoardType) =>
  `${BOARD_URL(board)}/catalog`;
export const THREAD_URL = (thread: ThreadType, board: BoardType) =>
  `${BOARD_URL(board)}/thread/${thread.originalPost.postNumber}`;
export const POST_URL = (
  post: PostType,
  thread: ThreadType,
  board: BoardType
) => `${THREAD_URL(thread, board)}#${post.postNumber}`;
export const BAN_URL = (ban: BanType) => `${BANS_URL}/${ban.id}`;
export const ATTACHMENT_URL = (attachment: AttachmentType) =>
  `${ATTACHMENTS_URL}/${attachment.path}/${attachment.filename}`;
export const ATTACHMENT_THUMB_URL = (attachment: AttachmentType) =>
  `${ATTACHMENTS_URL}/thumbs/${attachment.path}/${attachment.filename}`;

export const USERS_URL = "/users";
export const BANS_URL = "/bans";
export const UNBANS_URL = "/bans/unban";
export const LOGIN_URL = "/login";
export const LOGOUT_URL = "/logout";
export const DASHBOARD_URL = "/dashboard";
export const ATTACHMENTS_URL = "/usercontent";
