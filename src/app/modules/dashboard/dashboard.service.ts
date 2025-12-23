import { File } from "../files/file.model";
import { Folder } from "../folders/folder.model";
import { Note } from "../notes/note.model";
import { RecentItem } from "./dashboard.interface";

const STORAGE_LIMIT = 15 * 1024 * 1024 * 1024; // 15 GB

export const getStorageOverview = async (userId: string) => {
  const files = await File.find({ user: userId });

  const used = files.reduce((sum, file) => sum + file.size, 0);

  return {
    total: STORAGE_LIMIT,
    used,
    available: STORAGE_LIMIT - used,
  };
};

export const getDashboardSummary = async (userId: string) => {
  const [folders, notes, files] = await Promise.all([
    Folder.find({ user: userId }),
    Note.find({ user: userId }),
    File.find({ user: userId }),
  ]);

  const imageFiles = files.filter((f) => f.type === "image");
  const pdfFiles = files.filter((f) => f.type === "pdf");

  const sumSize = (arr: any[]) =>
    arr.reduce((sum, item) => sum + (item.size || 0), 0);

  return {
    folders: {
      count: folders.length,
    },
    notes: {
      count: notes.length,
    },
    images: {
      count: imageFiles.length,
      size: sumSize(imageFiles),
    },
    pdfs: {
      count: pdfFiles.length,
      size: sumSize(pdfFiles),
    },
  };
};

export const getRecentItems = async (userId: string) => {
  const notes = await Note.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  const files = await File.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  const folders = await Folder.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  const mixed: RecentItem[] = [
    ...notes.map(
      (n) => ({ ...n.toObject(), type: "note" } as unknown as RecentItem)
    ),
    ...files.map((f) => ({ ...f.toObject(), type: "file" } as RecentItem)),
    ...folders.map(
      (fo) => ({ ...fo.toObject(), type: "folder" } as unknown as RecentItem)
    ),
  ];

  return mixed
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);
};
