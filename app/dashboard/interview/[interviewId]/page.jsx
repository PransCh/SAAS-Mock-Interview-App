"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="flex flex-col items-center my-10 px-6 md:px-12">
      {/* Title */}
      <h2 className="font-bold text-3xl text-center">
        Let's Begin Your{" "}
        <span className="text-blue-600">{interviewData?.jobPosition}</span>{" "}
        Quiz!
      </h2>

      {/* Interview Details */}
      <div className="w-full max-w-3xl mt-6 bg-white shadow-md rounded-lg p-6 border">
        {interviewData ? (
          <div className="space-y-4">
            <h2 className="text-lg">
              <strong>Job Role:</strong> {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Tech Stack:</strong> {interviewData.jobDescription}
            </h2>
            <h2 className="text-lg">
              <strong>Difficulty Rating(Choose one between 1 to 10):</strong>{" "}
              {interviewData.jobExperience} years
            </h2>
          </div>
        ) : (
          <p className="text-gray-500">Loading Quiz details...</p>
        )}
      </div>

      {/* Information Alert */}
      <div className="mt-6 w-full max-w-3xl p-4 border-l-4 border-yellow-500 bg-yellow-100 shadow-sm rounded-md">
        <div className="flex items-center gap-2">
          <TriangleAlert className="text-yellow-700" />
          <h2 className="font-semibold text-yellow-800">
            Important Information
          </h2>
        </div>
        <p className="mt-2 text-gray-700">
          {process.env.NEXT_PUBLIC_INFORMATION}
        </p>
      </div>

      {/* Start Button */}
      <div className="mt-8">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="px-6 py-3 text-lg">🚀 Start Quiz</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
