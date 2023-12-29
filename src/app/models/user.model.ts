import { FormControl } from '@angular/forms';

export interface User {
  name?: string;
  email?: string;
  password?: string;
}

export interface RegistrationForm {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface LoginForm {
  email?: string | null;
  password?: string | null;
}

export interface LoginUser {
  email?: string;
  password?: string;
}

export interface GroupsMetadata {
  $metadata: metadata;
  Count: number;
  Items: GroupsItems[];
  ScannedCount: number;
}

type metadata = {
  attempts: number;
  httpStatusCode: number;
  requestId: string;
  totalRetryDelay: number;
};

export interface GroupsItems {
  createdAt: createdAt;
  createdBy: createdBy;
  id: id;
  name: name;
}

type createdAt = {
  S: string;
};

type createdBy = {
  S: string;
};

type id = {
  S: string;
};

type name = {
  S: string;
};

type authorId = {
  S: string;
};

type message = {
  S: string;
};

export interface UsersMetadata {
  $metadata: metadata;
  Count: number;
  Items: UsersList[];
  ScannedCount: number;
}

export interface UsersList {
  name: name;
  uid: id;
}

export interface GroupIdResponse {
  Count: number;
  Items: groupIdItems[];
}

type groupIdItems = {
  authorID: authorId;
  message: message;
  createdAt: createdAt;
};

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UsersData {
  users: UserProfileData[];
}

export interface SignupResponse {
  token?: string | null;
  uid?: string | null;
}
