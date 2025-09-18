"use client";

import { useState } from "react";
import FileUpload from "../components/FileUpload";
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [fileId, setFileId] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-3xl font-bold">📚 LawBandit — Chat with PDFs</h1>
      <p className="text-gray-600">Upload a PDF and ask questions about it.</p>

      <FileUpload onUploaded={setFileId} />

      {fileId && <ChatBox fileId={fileId} />}
    </main>
  );
}
