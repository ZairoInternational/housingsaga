import axios from "axios";
import { useState } from "react";

/** Official Bunny Storage API host (upload PUT target). */
const DEFAULT_BUNNY_STORAGE_API = "https://storage.bunnycdn.com";

function getBunnyConfig():
  | {
      storageUrl: string;
      storageZoneName: string;
      accessKey: string;
      cdnBaseUrl: string;
    }
  | { error: string } {
  const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE?.trim() ?? "";
  const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY?.trim() ?? "";
  const storageUrl =
    process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL?.trim() || DEFAULT_BUNNY_STORAGE_API;

  if (!storageZoneName || !accessKey) {
    return {
      error:
        "Upload is not configured. Set NEXT_PUBLIC_BUNNY_STORAGE_ZONE and NEXT_PUBLIC_BUNNY_ACCESS_KEY in .env",
    };
  }

  const cdnBaseUrl =
    process.env.NEXT_PUBLIC_BUNNY_CDN_URL?.trim() ||
    `https://${storageZoneName}.b-cdn.net`;

  return { storageUrl, storageZoneName, accessKey, cdnBaseUrl };
}

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

    const cfg = getBunnyConfig();
    if ("error" in cfg) {
      return { url: null, error: cfg.error };
    }
    const { storageUrl, storageZoneName, accessKey, cdnBaseUrl } = cfg;

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
        url: `${cdnBaseUrl.replace(/\/$/, "")}/${folderName}/${fileName}`,
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

    const cfg = getBunnyConfig();
    if ("error" in cfg) {
      return { imageUrls: [], error: cfg.error };
    }
    const { storageUrl, storageZoneName, accessKey, cdnBaseUrl } = cfg;

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
              `${cdnBaseUrl.replace(/\/$/, "")}/${folderName}/${fileName}`
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
