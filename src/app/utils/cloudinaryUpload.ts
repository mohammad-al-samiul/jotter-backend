import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "uploads"
): Promise<{
  publicId: string;
  url: string;
}> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      })
      .end(buffer);
  });
};
