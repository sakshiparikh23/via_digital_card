import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

export default function UploadTest() {
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3, uploadResult } = useS3Upload();

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    console.log(url);
    const res = await fetch("/api/cards", {
      method: "POST",
      body: JSON.stringify({
        profilePhoto: url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <img src={imageUrl} />}
    </div>
  );
}
