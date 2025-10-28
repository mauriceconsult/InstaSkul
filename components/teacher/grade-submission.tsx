"use client";

import { useEffect, useState } from "react";

export function GradeSubmissions({ assignmentId }: { assignmentId: string }) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/assignments/${assignmentId}/submissions`)
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      });
  }, [assignmentId]);

  const handleGrade = async (id: string, grade: string, feedback: string) => {
    await fetch(`/api/assignments/${assignmentId}/grade`, {
      method: "POST",
      body: JSON.stringify({ submissionId: id, grade: parseFloat(grade), feedback }),
    });
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isGraded: true, grade, feedback } : s))
    );
  };

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="space-y-6">
      {submissions.map((sub) => (
        <div key={sub.id} className="border p-4 rounded-lg">
          <p className="font-semibold">{sub.user.name || sub.user.email}</p>
          {sub.text && <p className="mt-2 text-gray-700">{sub.text}</p>}
          {sub.fileUrl && (
            <a href={sub.fileUrl} target="_blank" className="text-blue-600 underline">
              View File
            </a>
          )}
          <div className="mt-3 flex gap-2 items-center">
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Grade"
              className="border p-1 w-20"
              disabled={sub.isGraded}
            />
            <input
              type="text"
              placeholder="Feedback"
              className="border p-1 flex-1"
              disabled={sub.isGraded}
            />
            <button
              onClick={(e) => {
                const grade = (e.target as any).previousSibling.previousSibling.value;
                const feedback = (e.target as any).previousSibling.value;
                handleGrade(sub.id, grade, feedback);
              }}
              disabled={sub.isGraded}
              className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              {sub.isGraded ? "Graded" : "Grade"}
            </button>
          </div>
          {sub.isGraded && (
            <p className="text-green-600 mt-2">
              Graded: {sub.grade}/100 — {sub.feedback}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}