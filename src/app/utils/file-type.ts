import { FileType } from "../types/file-type.enum";

export const getFileTypeFromMime = (mimetype: string): FileType => {
  if (mimetype.startsWith("image/")) return FileType.IMAGE;
  if (mimetype === "application/pdf") return FileType.PDF;
  if (mimetype.startsWith("video/")) return FileType.VIDEO;
  if (mimetype.startsWith("audio/")) return FileType.AUDIO;

  if (
    mimetype === "application/msword" ||
    mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return FileType.DOC;
  }

  throw new Error("Unsupported file type");
};
