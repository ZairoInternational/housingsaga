"use client";

import { useRef } from "react";
import { CloudUpload } from "lucide-react";

import { useHouseFormStore } from "@/store/HouseStore";
import { useBunnyUpload } from "@/hooks/useBunnyUpload";

export default function MediaSection() {
  const { formData, updateField } = useHouseFormStore();
  const { uploadFiles, loading } = useBunnyUpload();

  const imageRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
  };

  // const handleImageUpload = async(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {}
  // );   

  return (
    <div className="border border-neutral-500 dark:border-none dark:bg-secondary dark:text-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Media</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="images" className="block text-sm font-medium mb-2">
            Property Images (URLs)
          </label>
          <input ref={imageRef} type="file" />
          <div
            onClick={() => imageRef.current?.click()}
            className=" h-36 w-36 flex flex-col justify-center items-center rounded-md border border-dotted border-white mx-auto cursor-pointer"
          >
            <CloudUpload size={72} />
            <p>Upload Image</p>
          </div>
        </div>
        <div>
          <label htmlFor="video" className="block text-sm font-medium mb-2">
            Video URL
          </label>
          <input
            type="url"
            id="video"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
            placeholder="Enter video URL"
            className="w-full px-4 py-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
