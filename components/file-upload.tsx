// components/file-upload.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/server/uploadthing";

interface FileUploadProps {
  onChange: (url: string) => void;
  endpoint: keyof OurFileRouter;
}

export function FileUpload({ onChange, endpoint }: FileUploadProps) {
  return (
    <UploadButton<OurFileRouter, keyof OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("PROD: Upload complete!", res);
        if (res?.[0]?.url) onChange(res[0].url);
      }}
      onUploadError={(err) => {
        console.error("Upload failed:", err);
        alert("Upload failed");
      }}
    />
  );
}