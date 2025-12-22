import { Note } from "../notes/note.model";
import { File } from "../files/file.model";
import { Folder } from "../folders/folder.model";

export const globalSearch = async (userId: string, query: string) => {
  const regex = new RegExp(query, "i");

  const notes = await Note.find({ user: userId, title: regex });
  const files = await File.find({ user: userId, name: regex });
  const folders = await Folder.find({ user: userId, name: regex });

  return { notes, files, folders };
};
