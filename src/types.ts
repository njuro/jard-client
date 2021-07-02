import React from "react";
import { Required } from "utility-types";

export type uuid = string;
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BoardType {
  label: string;
  name: string;
  pageCount: number;
  settings: BoardSettingsType;
  threads?: ThreadType[];
}

export interface BoardSettingsType {
  attachmentCategories: AttachmentCategoryType[];
  nsfw: boolean;
  threadLimit: number;
  bumpLimit: number;
  defaultPosterName: string;
  forceDefaultPosterName: boolean;
  countryFlags: boolean;
  posterThreadIds: boolean;
  captchaEnabled: boolean;
}

export interface ThreadType {
  threadNumber: number;
  subject: string;
  stickied: boolean;
  locked: boolean;
  createdAt: string;
  lastReplyAt: string;
  lastBumpAt: string;
  board?: BoardType;
  statistics: ThreadStatisticsType;
  originalPost: OriginalPostType;
  replies: PostType[];
}

export type ThreadCatalogType = Omit<ThreadType, "replies">;

export interface ThreadStatisticsType {
  replyCount: number;
  attachmentCount: number;
  posterCount: number;
}

export interface PostType {
  name: string;
  postNumber: number;
  tripcode: string;
  capcode: string;
  body: string;
  createdAt: string;
  ip?: string;
  countryCode: string;
  countryName: string;
  posterThreadId: string;
  sage: boolean;
  deletionCode: string;
  thread?: ThreadType;
  attachment?: AttachmentType;
  originalPost: boolean;
}

export interface PostSearchResultsType {
  resultList: PostType[];
  resultsCount: number;
  totalResultsCount: number;
}

export type OriginalPostType = Required<PostType, "attachment">;

export interface AttachmentType {
  category: AttachmentCategoryType;
  originalFilename: string;
  filename: string;
  thumbnailFilename: string;
  folder: string;
  thumbnailFolder: string;
  remoteStorageUrl: string;
  remoteStorageThumbnailUrl: string;
  metadata: AttachmentMetadataType;
  embedData: AttachmentEmbedDataType;
}

export interface AttachmentCategoryType {
  name: AttachmentCategoryNameEnum;
  hasThumbnail: boolean;
  extensions: string[];
  mimeTypes: string[];
}

export enum AttachmentCategoryNameEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  PDF = "PDF",
  TEXT = "TEXT",
  EMBED = "EMBED",
}

export interface AttachmentMetadataType {
  mimeType: string;
  width: number;
  height: number;
  thumbnailWidth: number;
  thumbnailHeight: number;
  fileSize: string;
  duration: string;
  checksum: string;
}

export interface AttachmentEmbedDataType {
  embedUrl: string;
  thumbnailUrl: string;
  providerName: string;
  uploaderName: string;
  renderedHtml: string;
}

export interface UserType {
  username: string;
  email: string;
  enabled?: boolean;
  role: UserRole;
  authorities: UserAuthority[];
  registrationIp?: string;
  lastLoginIp?: string;
  lastLogin?: string;
  createdAt?: string;
}

export interface EditAccountType {
  username: string;
  role: string;
  email: string;
}

export interface EditPasswordType {
  currentPassword: string;
  newPassword: string;
  newPasswordRepeated: string;
}

export interface ForgotPasswordType {
  username: string;
}

export interface ResetPasswordType {
  token: string;
  password: string;
  passwordRepeated: string;
}

export interface BanType {
  id: uuid;
  ip: string;
  status: BanStatus;
  bannedBy: UserType;
  reason: string;
  unbannedBy: UserType;
  unbanReason: string;
  validFrom: string;
  validTo: string;
  warning: boolean;
}

export enum BanStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  UNBANNED = "UNBANNED",
  WARNING = "WARNING",
}

export interface UnbanFormType {
  ip: string;
  reason: string;
}

export enum UserRole {
  USER = "USER",
  JANITOR = "JANITOR",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export enum UserAuthority {
  MANAGE_BOARDS = "MANAGE_BOARDS",
  TOGGLE_STICKY_THREAD = "TOGGLE_STICKY_THREAD",
  TOGGLE_LOCK_THREAD = "TOGGLE_LOCK_THREAD",
  DELETE_POST = "DELETE_POST",
  MANAGE_USERS = "MANAGE_USERS",
  VIEW_IP = "VIEW_IP",
  MANAGE_BANS = "MANAGE_BANS",
}

export interface InputConstraintsType {
  MAX_BOARD_LABEL_LENGTH: number;
  MAX_BOARD_NAME_LENGTH: number;
  MAX_THREAD_LIMIT: number;
  MAX_BUMP_LIMIT: number;
  MAX_NAME_LENGTH: number;
  MAX_TRIPCODE_PASSWORD_LENGTH: number;
  MAX_SUBJECT_LENGTH: number;
  MAX_POST_LENGTH: number;
  MAX_ATTACHMENT_SIZE: number;
  MIN_USERNAME_LENGTH: number;
  MAX_USERNAME_LENGTH: number;
  MIN_PASSWORD_LENGTH: number;
  MAX_BAN_REASON_LENGTH: number;
}
