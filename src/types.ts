import React from "react";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BoardType {
  label: string;
  name: string;
  attachmentType: BoardAttachmentType;
  nsfw: boolean;
  threadLimit: number;
  bumpLimit: number;
  threads?: ThreadType[];
}

export enum BoardAttachmentType {
  IMAGE,
  TEXT,
  ALL,
}

export interface BoardAttachmentTypeView {
  name: BoardAttachmentType;
  description: string;
}

export interface ThreadType {
  subject: string;
  stickied: boolean;
  locked: boolean;
  createdAt: string;
  lastReplyAt: string;
  board?: BoardType;
  statistics: ThreadStatisticsType;
  originalPost: PostType;
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
  body: string;
  createdAt: string;
  ip?: string;
  thread?: ThreadType;
  attachment?: AttachmentType;
}

export interface AttachmentType {
  originalFilename: string;
  filename: string;
  width: number;
  height: number;
  thumbWidth: number;
  thumbHeight: number;
  url: string;
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

export interface BanType {
  id?: number;
  ip: string;
  status?: BanStatus;
  bannedBy: UserType;
  reason: string;
  unbannedBy?: UserType;
  unbanReason?: string;
  start: string;
  end: string;
  warning?: boolean;
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
