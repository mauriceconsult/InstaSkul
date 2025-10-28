"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export function SubmitAssignment({ assignmentId }: { assignmentId: string }) {
  const { user } = useUser();
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`/api/assignments/${assignmentId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, fileUrl }),
    });

    if (res.ok) setSubmitted(true);
    setLoading(false);
  };

  if (!user) return <p>Please sign in.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Submit Your Work</h2>

      {submitted ? (
        <p className="text-green-600 font-bold">Submitted successfully!</p>
      ) : (
        <>
          <textarea
            placeholder="Your answer (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 h-32"
          />
          <input
            type="text"
            placeholder="File URL (Google Drive, Dropbox, etc.)"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || (!text.trim() && !fileUrl.trim())}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Assignment"}
          </button>
        </>
      )}
    </div>
  );
}