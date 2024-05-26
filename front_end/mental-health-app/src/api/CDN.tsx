import { uuid } from "uuidv4";

export default async function uploadFile(file: File): Promise<string> {
  const CLOUD_NAME: string = "dijcxemmw";

  const public_id: string = `${uuid()}.wav`;

  const formData: FormData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "user_audio");
  formData.append("public_id", public_id);

  const response: Response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data: any = await response.json();

  return data["url"];
}
