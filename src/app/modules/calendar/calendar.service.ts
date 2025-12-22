import { Note } from "../notes/note.model";
import { File } from "../files/file.model";

export const getCalendarItems = async (
  userId: string,
  start: Date,
  end: Date
) => {
  const notes = await Note.find({
    user: userId,
    createdAt: { $gte: start, $lte: end },
  });

  const files = await File.find({
    user: userId,
    createdAt: { $gte: start, $lte: end },
  });

  return { notes, files };
};
