import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function InterviewItemCard({interview}) {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
      <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
      <h2 className='text-sm text-gray-700'>{interview?.jobExperience} Difficulty Rating</h2>
      <h2 className='text-sm text-gray-500'>Created on: {interview.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        <Link href={"/dashboard/interview/"+interview?.mockId+"/feedback"} className="w-full">
        <Button size="sm" variant="outline" 
        >View Feedback</Button>
        </Link>
        <Link href={"/dashboard/interview/"+interview?.mockId} className="w-full">
        <Button size="sm" className="w-full">Start Over</Button>
        </Link>
      </div>
    </div>
  )
}

export default InterviewItemCard
