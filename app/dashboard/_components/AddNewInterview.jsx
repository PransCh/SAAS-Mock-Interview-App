"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'
  

function AddNewInterview() {

    const [openDialog,setOpenDialog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDescription,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse, setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();

    const onSubmit=async(e)=>{
      setLoading(true)
      e.preventDefault()
      console.log(jobPosition,jobDescription,jobExperience)

      const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDescription+", Years of experience: "+jobExperience+". Based on this information, give "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with answers in JSON. Don't give anything else just the interview questions along with answers in array of objects format."
      
      const result=await chatSession.sendMessage(InputPrompt);
      const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
      
      setJsonResponse(MockJsonResp);

      if(MockJsonResp){
      const resp=await db.insert(MockInterview)
      .values({
        mockId:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDescription:jobDescription,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')

      }).returning({mockId:MockInterview.mockId});
      console.log("Inserted ID:",resp)
      if(resp){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+resp[0]?.mockId)
      }
      }
      else{
        console.log("error")
      }
      setLoading(false);
    } 
  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary
      hover:scale-105 hover:shadow-md cursor-pointer transistion-all'
      onClick={()=>setOpenDialog(true)}
      
      >
        <h2 className='text-lg text-center'>+Add New</h2>
      </div>
      <Dialog open={openDialog}>
    <DialogContent className="max-w-2xl">
        <DialogHeader>
      <DialogTitle className='text-2xl'>Tell us more about your Quiz</DialogTitle>
      <DialogDescription>
      <form onSubmit={onSubmit}>
        <div>        
            <div className='mt-7 my-3'>
                <label>Domain</label>
                <Input placeholder="ex. Full Stack Developer" required
                onChange={(event)=>setJobPosition(event.target.value)}
                />
            </div> 
            <div className='mt-7 my-3'>
                <label>Enter Particular topic/s</label>
                <Textarea placeholder="ex. React, Angular, Nodejs, SQL" required
                onChange={(event)=>setJobDesc(event.target.value)}
                />
            </div>
            <div className='mt-7 my-3'>
                <label>Difficulty Rating (0 to 10)</label>
                <Input placeholder="ex. 3" type="number" max="50" required
                onChange={(event)=>setJobExperience(event.target.value)}
                />
            </div>      
        </div>
        <div className='flex gap-5 justify-end'>
            <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disable={loading}>
              {loading?
              <>
              <LoaderCircle className='animate-spin'/>'Generating AI Questions'</>:'Start Quiz'
            }
              </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
 </Dialog>

    </div>
  )
}

export default AddNewInterview
