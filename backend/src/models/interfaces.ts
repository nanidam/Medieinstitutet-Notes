export interface IUser {
  userID: number;
  name: string;
  mail: string;
  password: string;
  deleted: number;
}

export interface INote {
  postID: number;
  title: Buffer | String;
  body: Buffer;
  user: string;
  deleted: 0 | 1;
}
