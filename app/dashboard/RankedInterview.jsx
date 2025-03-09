"use client"

import { useEffect, useState } from "react";

export default function RankedInterviews({ userId }) {
  const [rankedInterviews, setRankedInterviews] = useState([]);

  useEffect(() => {
    fetch(
      `/dashboard/interview/713355bf-3085-4cbb-9136-1d3b0253cfea?`
    )
      .then((res) => res.json())
      .then((data) => setRankedInterviews(data))
      .catch((err) => console.error("Error fetching ranked interviews:", err));
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">📊 Ranked Quizzes!</h2>
      <ul className="mt-4 space-y-4">
        {rankedInterviews.map((interview, index) => (
          <li
            key={interview.mock_id}
            className="p-4 border rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">
              {index + 1}. {interview.job_position} - ⭐ {interview.rating}
            </h3>
            <p className="text-gray-600">{interview.job_description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
