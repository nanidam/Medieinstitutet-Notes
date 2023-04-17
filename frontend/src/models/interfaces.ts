export interface INote {
  postID: number;
  title: Buffer;
  body: Buffer;
  user: string;
  deleted: 0 | 1;
}
