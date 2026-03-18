import axios from "axios";
import { useState } from "react";

interface UploadResult {
  imageUrls: string[];
  error: string | null;
}

interface UploadSingleResult {
  url: string | null;
  error: string | null;
}

type UploadProgressHandler = (progressPercent: number) => void;

export const useBunnyUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadFileWithProgress = async ({
    file,
    folderName,
    allowedMimeTypes,
    onProgress,
  }: {
    file: File;
    folderName: string;
    allowedMimeTypes: readonly string[];
    onProgress?: UploadProgressHandler;
  }): Promise<UploadSingleResult> => {
    if (!allowedMimeTypes.includes(file.type)) {
      return { url: null, error: "Unsupported file type." };
    }

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE!;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY!;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL!;

    const fileName = `${generateRandomString(7)}${file.name}`;

    try {
      await axios.put(
        `${storageUrl}/${storageZoneName}/${folderName}/${fileName}`,
        file,
        {
          headers: {
            AccessKey: accessKey,
            "Content-Type": file.type,
          },
          onUploadProgress: (evt) => {
            if (!onProgress) return;
            const total = evt.total ?? 0;
            if (!total) return;
            const pct = Math.min(100, Math.max(0, Math.round((evt.loaded / total) * 100)));
            onProgress(pct);
          },
        }
      );

      return {
        url: `https://vacationsaga.b-cdn.net/${folderName}/${fileName}`,
        error: null,
      };
    } catch (err) {
      console.error("Error uploading file:", err);
      return { url: null, error: "Upload failed. Please try again." };
    }
  };

  const uploadFiles = async (
    files: File | File[],
    name?: string
  ): Promise<UploadResult> => {
    const fileArray = Array.isArray(files) ? files : [files];

    if (fileArray.length === 0) {
      return { imageUrls: [], error: "No files provided." };
    }

    for (const file of fileArray) {
      if (
        !(
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp"
        )
      ) {
        return {
          imageUrls: [],
          error: "Only PNG, JPEG, and WEBP files are allowed.",
        };
      }
    }

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE!;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY!;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL!;

    setLoading(true);

    const imageUrls: string[] = [];
    const folderName = name ? name : "ProfilePictures";

    try {
      await Promise.all(
        fileArray.map(async (file) => {
          const randomNumberToAddInImageName = generateRandomString(7);
          const fileName = `${randomNumberToAddInImageName}${file.name}`;

          try {
            await axios.put(
              `${storageUrl}/${storageZoneName}/${folderName}/${fileName}`,
              file,
              {
                headers: {
                  AccessKey: accessKey,
                  "Content-Type": file.type,
                },
              }
            );
            imageUrls.push(
              `https://vacationsaga.b-cdn.net/${folderName}/${fileName}`
            );
          } catch (uploadError) {
            console.error("Error uploading file:", uploadError);
          }
        })
      );

      setLoading(false);
      return { imageUrls, error: null };
    } catch (err) {
      console.error("Error uploading files:", err);
      setLoading(false);
      return {
        imageUrls: [],
        error: "Error uploading files. Please try again.",
      };
    }
  };

  return { uploadFiles, uploadFileWithProgress, loading };
};

const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
