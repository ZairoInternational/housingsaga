"use client";

import { useRef, useState } from "react";
import { CloudUpload, X, Video, ImageIcon, Loader2 } from "lucide-react";
import { useHouseFormStore } from "@/store/HouseStore";
import { useBunnyUpload } from "@/hooks/useBunnyUpload";
import { Field, Input } from "./FormFields";

export default function StepMedia() {
  const { formData, updateField } = useHouseFormStore();
  const { uploadFiles } = useBunnyUpload();
  const imageRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    const fileArray = Array.from(files);
    const { imageUrls, error } = await uploadFiles(fileArray);
    setUploading(false);
    if (error) {
      setUploadError("Upload failed. Please try again.");
      return;
    }
    if (imageUrls.length > 0) {
      updateField("images", [...(formData.images ?? []), ...imageUrls]);
    }
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeImage = (url: string) => {
    updateField("images", (formData.images ?? []).filter((u: string) => u !== url));
  };

  return (
    <div className="space-y-6">
      {/* Image upload */}
      <div>
        <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 block">
          Property Photos
        </label>

        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => imageRef.current?.click()}
          disabled={uploading}
          className={`
            w-full border-2 border-dashed rounded-2xl py-10 flex flex-col items-center gap-3 transition-all
            ${uploading
              ? "border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10 cursor-wait"
              : "border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
            }
          `}
        >
          {uploading ? (
            <Loader2 size={32} className="text-emerald-500 animate-spin" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <CloudUpload size={24} className="text-gray-400" />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {uploading ? "Uploading photos…" : "Click to upload photos"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, WEBP — multiple files allowed
            </p>
          </div>
        </button>

        {uploadError && (
          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {uploadError}
          </p>
        )}
      </div>

      {/* Preview grid */}
      {(formData.images ?? []).length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon size={13} className="text-gray-400" />
            <span className="text-xs text-gray-400">{formData.images.length} photo{formData.images.length !== 1 ? "s" : ""} uploaded</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {(formData.images as string[]).map((url, i) => (
              <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <img
                  src={url}
                  alt={`Property ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X size={12} className="text-white" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-md font-medium">
                    Cover
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video URL */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <Field
          label="Video Tour URL"
          hint="YouTube, Vimeo, or any direct video link"
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Video size={14} />
            </span>
            <Input
              type="url"
              name="video"
              defaultValue={formData.video}
              onChange={e => updateField("video", e.target.value)}
              placeholder="https://youtube.com/watch?v=…"
              className="pl-8"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}
