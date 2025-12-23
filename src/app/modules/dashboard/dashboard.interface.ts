export interface RecentItem {
  _id: any;
  type: "note" | "file" | "folder";
  createdAt: Date;
}
