import { useState } from "react";

export default function useProgress() {
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  function updateProgress(progress: ProgressEvent) {
    if (progress.lengthComputable) {
      const percent = Math.floor((progress.loaded / progress.total) * 100);
      setUploadProgress(percent);
    }
  }

  function resetProgress() {
    setUploadProgress(0);
  }

  return { uploadProgress, updateProgress, resetProgress };
}
