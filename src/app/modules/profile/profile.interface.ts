export interface IUpdateProfilePayload {
  name?: string;
  avatar?: string; // image url
}

export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
