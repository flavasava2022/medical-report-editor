import { Upload, X } from "lucide-react";
import React, { useRef } from "react";

export default function ImageUploader({
  image,
  index,
  onImageChange,
  onRemoveImage,
}) {
  const inputRef = useRef(null);
  return (
    <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 relative bg-gray-50">
      {image ? (
        <>
          <img
            src={image}
            alt={`Report  ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onRemoveImage(index)}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition-transform hover:scale-110"
          >
            <X size={14} />
          </button>
        </>
      ) : (
        <div className="text-center">
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="p-4 rounded-lg hover:bg-gray-200"
          >
            <Upload size={24} className="mx-auto" />
            <span className="text-sm mt-1">Upload Image</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onImageChange(e, index)}
          />
        </div>
      )}
    </div>
  );
}
