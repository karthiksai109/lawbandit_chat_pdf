"use client";

import { useState } from "react";

interface Props {
  onUploaded: (id: string) => void;
}

export default function FileUpload({ onUploaded }: Props) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = (e.currentTarget.elements.namedItem("file") as HTMLInputElement);
    if (!fileInput?.files?.[0]) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.id) {
        onUploaded(data.id);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
      <input type="file" name="file" accept="application/pdf" required />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
}
