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
  attachment.amazonS3Url ||
  `${ATTACHMENTS_URL}/${attachment.folder}/${attachment.filename}`;
export const ATTACHMENT_THUMB_URL = (attachment: AttachmentType) =>
  attachment.amazonS3ThumbnailUrl ||
  `${ATTACHMENTS_URL}/${attachment.thumbnailFolder}/${attachment.thumbnailFilename}`;

export const HOME_URL = "/";
export const BOARDS_URL = "/boards";
export const USERS_URL = "/users";
export const BANS_URL = "/bans";
export const BAN_STATUS_URL = "/banstatus";
export const LOGIN_URL = "/login";
export const LOGOUT_URL = "/logout";
export const DASHBOARD_URL = "/dashboard";
export const ATTACHMENTS_URL = `${SERVER_API_URL}/usercontent`; // should be used only in local development

export const BOARD_ROUTE = `${BOARDS_URL}/:label/:page?`;
export const BOARD_CATALOG_ROUTE = `${BOARDS_URL}/:label/catalog`;
export const THREAD_ROUTE = `${BOARDS_URL}/:label/thread/:threadNumber`;
