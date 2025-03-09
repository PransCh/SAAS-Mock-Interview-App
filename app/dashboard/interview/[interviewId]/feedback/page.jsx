"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { index } from 'drizzle-orm/mysql-core'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


function Feedback({params}) {

  const [feedbackList, setFeedbackList]=useState([]);
  const router=useRouter();
  useEffect(()=>{
    GetFeedback();
  },[])


  const GetFeedback=async()=>{
    const result=await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id)
    console.log(result);
    setFeedbackList(result);
  }
  return (
    <div className='p-10'>
      
      

      {feedbackList?.length==0?
      <>
      <h2 className='font-bold text-bold mx-5'>You have created this Quiz but have not taken the Quiz yet :)</h2>
      <Link href={"/dashboard/interview/"+params?.interviewId}>
      <Button className="my-5 mx-5 bg-blue-500 hover:bg-green-400">Start now</Button>
      </Link>
      </>
      :

      <>
      <h2 className='text-3xl font-bold text-green-500'>Let's take a look at your Quiz feedback</h2>

      


      {/* <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2> */}

      <h2 className='text-lg font-bold text-gray-500 my-2'>Take a look at your answers for each question along with feedback for your answer and also correct answers</h2>
      {feedbackList&&feedbackList.map((item,index)=>(
        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='flex justify-between p-2 bg-secondary rounded-lg my-4 text-left gap-7 w-full'>
        {item.question} <ChevronsUpDownIcon className='h-5 w-5'/>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className='flex flex-col gap-2'>
            <h2 className='text-red-500 p-2 rounded-lg'><strong>Rating for this answer: </strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct/Expected Answer: </strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback for this answer: </strong>{item.feedback}</h2>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      ))}
      </>}
      <Button onClick={()=>router.replace('/dashboard')} className="my-5 bg-blue-500 hover:bg-blue-500">Home</Button>
    </div>
  )
}

export default Feedback
