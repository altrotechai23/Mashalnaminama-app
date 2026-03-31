"use client";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function MultiImageUpload({ urls, onUpload }: { urls: string[], onUpload: (url: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {urls.map((url) => (
          <div key={url} className="relative aspect-square bg-zinc-900 overflow-hidden rounded">
            <Image src={url} alt="Product" fill className="object-cover" />
          </div>
        ))}
      </div>

      <CldUploadWidget 
        uploadPreset="products_upload" 
        onSuccess={(result: any) => onUpload(result.info.secure_url)}
      >
        {({ open }) => (
          <button 
            type="button"
            onClick={() => open()}
            className="w-full py-4 border-2 border-dashed border-zinc-700 hover:border-white text-zinc-400 hover:text-white transition"
          >
            + Add Product Images
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
