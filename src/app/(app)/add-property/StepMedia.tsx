"use client";

import { useRef, useState } from "react";
import { CloudUpload, X, Video, ImageIcon, Loader2, Map as MapIcon } from "lucide-react";
import { useHouseFormStore } from "@/store/HouseStore";
import { useBunnyUpload } from "@/hooks/useBunnyUpload";
import { Field, Input } from "./FormFields";

export default function StepMedia() {
  const { formData, updateField } = useHouseFormStore();
  const { uploadFiles, uploadFileWithProgress } = useBunnyUpload();
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const floorPlanRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [floorUploading, setFloorUploading] = useState(false);
  const [floorProgress, setFloorProgress] = useState(0);
  const [floorError, setFloorError] = useState<string | null>(null);

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

  const setCoverImage = (url: string) => {
    const current = (formData.images ?? []) as string[];
    if (current.length === 0) return;
    if (current[0] === url) return;
    const next = [url, ...current.filter((u) => u !== url)];
    updateField("images", next);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoUploading(true);
    setVideoProgress(0);
    setVideoError(null);

    const { url, error } = await uploadFileWithProgress({
      file,
      folderName: "PropertyVideos",
      allowedMimeTypes: ["video/mp4", "video/webm", "video/quicktime"],
      onProgress: setVideoProgress,
    });

    setVideoUploading(false);
    if (error || !url) {
      setVideoError(error ?? "Upload failed. Please try again.");
      return;
    }

    // Store in videoUrl to keep schema/back-end unchanged.
    updateField("videoUrl", url);
    e.target.value = "";
  };

  const handleFloorPlanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFloorUploading(true);
    setFloorProgress(0);
    setFloorError(null);

    const { url, error } = await uploadFileWithProgress({
      file,
      folderName: "FloorPlans",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
      onProgress: setFloorProgress,
    });

    setFloorUploading(false);
    if (error || !url) {
      setFloorError(error ?? "Upload failed. Please try again.");
      return;
    }

    updateField("floorMapImage", url);
    e.target.value = "";
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
              ? "border-lime-400 bg-lime-50/50 dark:bg-lime-950/10 cursor-wait"
              : "border-gray-200 dark:border-gray-700 hover:border-lime-400 dark:hover:border-lime-600 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
            }
          `}
        >
          {uploading ? (
            <Loader2 size={32} className="text-lime-500 animate-spin" />
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
              <button
                key={i}
                type="button"
                onClick={() => setCoverImage(url)}
                className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left"
                aria-label={i === 0 ? "Cover image" : "Set as cover image"}
                title={i === 0 ? "Cover image" : "Click to set as cover"}
              >
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
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] bg-lime-500 text-white px-1.5 py-0.5 rounded-md font-medium">
                    Cover
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Video upload */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 block">
          Video Upload (Optional)
        </label>

        <input
          ref={videoRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => videoRef.current?.click()}
          disabled={videoUploading}
          className={`
            w-full border-2 border-dashed rounded-2xl py-6 px-5 flex items-center justify-between gap-4 transition-all
            ${videoUploading
              ? "border-lime-400 bg-lime-50/50 dark:bg-lime-950/10 cursor-wait"
              : "border-gray-200 dark:border-gray-700 hover:border-lime-400 dark:hover:border-lime-600 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {videoUploading ? (
              <Loader2 size={18} className="text-lime-500 animate-spin" />
            ) : (
              <Video size={18} className="text-gray-400" />
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {videoUploading ? "Uploading video…" : "Click to upload a video file"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">MP4 / WebM / MOV</p>
            </div>
          </div>

          {videoUploading && (
            <div className="w-28">
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-lime-500 transition-all"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-400 text-right">{videoProgress}%</p>
            </div>
          )}
        </button>

        {videoError && (
          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {videoError}
          </p>
        )}

        {formData.videoUrl && (
          <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/5 p-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Uploaded video</p>
              <a
                href={formData.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-lime-600 dark:text-lime-400 truncate block"
              >
                {formData.videoUrl}
              </a>
            </div>
            <button
              type="button"
              onClick={() => updateField("videoUrl", "")}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/8 transition"
            >
              Remove
            </button>
          </div>
        )}
      </div>

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
              name="videoUrl"
              defaultValue={formData.videoUrl}
              onChange={e => updateField("videoUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=…"
              className="pl-8"
            />
          </div>
        </Field>
      </div>

      {/* Floor plan upload */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
        <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 block">
          Floor Plan Upload (Optional)
        </label>

        <input
          ref={floorPlanRef}
          type="file"
          accept="image/*"
          onChange={handleFloorPlanUpload}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => floorPlanRef.current?.click()}
          disabled={floorUploading}
          className={`
            w-full border-2 border-dashed rounded-2xl py-6 px-5 flex items-center justify-between gap-4 transition-all
            ${floorUploading
              ? "border-lime-400 bg-lime-50/50 dark:bg-lime-950/10 cursor-wait"
              : "border-gray-200 dark:border-gray-700 hover:border-lime-400 dark:hover:border-lime-600 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {floorUploading ? (
              <Loader2 size={18} className="text-lime-500 animate-spin" />
            ) : (
              <MapIcon size={18} className="text-gray-400" />
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {floorUploading ? "Uploading floor plan…" : "Click to upload a floor plan image"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">JPG / PNG / WEBP</p>
            </div>
          </div>

          {floorUploading && (
            <div className="w-28">
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div
                  className="h-full bg-lime-500 transition-all"
                  style={{ width: `${floorProgress}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-400 text-right">{floorProgress}%</p>
            </div>
          )}
        </button>

        {floorError && (
          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {floorError}
          </p>
        )}

        {formData.floorMapImage && (
          <div className="mt-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-white/5 p-3 flex items-center gap-3">
            <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-shrink-0">
              <img
                src={formData.floorMapImage}
                alt="Floor plan preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Uploaded floor plan</p>
              <a
                href={formData.floorMapImage}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-lime-600 dark:text-lime-400 truncate block"
              >
                {formData.floorMapImage}
              </a>
            </div>
            <button
              type="button"
              onClick={() => updateField("floorMapImage", "")}
              className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/8 transition"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Floor map image URL */}
      <div>
        <Field
          label="Floor Map Image URL"
          hint="Optional image showing the floor plan layout"
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MapIcon size={14} />
            </span>
            <Input
              type="url"
              name="floorMapImage"
              defaultValue={formData.floorMapImage}
              onChange={e => updateField("floorMapImage", e.target.value)}
              placeholder="https://example.com/floorplan.jpg"
              className="pl-8"
            />
          </div>
        </Field>
      </div>
    </div>
  );
}
