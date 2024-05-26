import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  secure: true,
});

// TODO this can be changed to stream instead of file, if necessary
export async function uploadFile(filename: string): Promise<string> {
  const options = {
    unique_filename: true,
  };

  try {
    const result = await cloudinary.uploader.upload(filename, options);
    console.log(result);
    return result.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


function uploadFile(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const fd = new FormData();
  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', ''); // Optional - add tags for image admin in Cloudinary
  fd.append('file', file);

  fetch(url, {
    method: 'POST',
    body: fd,
  })
    .then((response) => response.json())
    .then((data) => {
      // File uploaded successfully
      const url = data.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      const tokens = url.split('/');
      tokens.splice(-3, 0, 'w_150,c_scale');
      const img = new Image();
      img.src = tokens.join('/');
      img.alt = data.public_id;
      document.getElementById('gallery').appendChild(img);
    })
    .catch((error) => {
      console.error('Error uploading the file:', error);
    });
}
