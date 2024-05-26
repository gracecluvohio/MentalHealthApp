import {v2} from "cloudinary";

cloudinary.config({
  secure: true,
});

// TODO this can be changed to stream instead of file, if necessary
export async function uploadImage(file: File): Promise<string> {
  const options = {
    unique_filename: true,
  };

  try {
    const result = await cloudinary.uploader.upload(file, options);
    console.log(result);
    return result.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
