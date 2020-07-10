import {
  AttachmentType,
  BanType,
  BoardType,
  PostType,
  ThreadType,
  UserType,
} from "../types";
import { SERVER_API_URL } from "./api";

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
  attachment.awsUrl ||
  `${ATTACHMENTS_URL}/${attachment.folder}/${attachment.filename}`;
export const ATTACHMENT_THUMB_URL = (attachment: AttachmentType) =>
  attachment.awsThumbnailUrl ||
  `${ATTACHMENTS_URL}/thumbs/${attachment.folder}/${attachment.thumbnailFilename}`;

export const USERS_URL = "/users";
export const BANS_URL = "/bans";
export const LOGIN_URL = "/login";
export const LOGOUT_URL = "/logout";
export const DASHBOARD_URL = "/dashboard";
export const ATTACHMENTS_URL = `${SERVER_API_URL}/usercontent`;
