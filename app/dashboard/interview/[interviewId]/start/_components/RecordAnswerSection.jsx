"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserAnswer } from '@/utils/schema'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer,setUserAnswer]=useState('');
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>{
            setUserAnswer(prevAns=>prevAns+result?.transcript)
        })
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          UpdateUserAnswer()
        }
        // if(userAnswer?.length<10)
        //   {
        //     setLoading(false);
        //     toast('Oops! you answer is very short or has not been recorded, please check your audio input and try again or press stop recording after you have finished giving the answer.')
        //     return;
        //   }
      },[userAnswer])


      const StartStopRecording=async()=>{
        if(isRecording)
          {
          
          stopSpeechToText()
         
          
        }
        else{
          startSpeechToText()
        }
      }

      const UpdateUserAnswer=async()=>{
        console.log(userAnswer)
        
        
        setLoading(true)
        const feedbackPrompt="Question: "+mockInterviewQuestion[activeQuestionIndex]?.question+
          "User Answer: "+userAnswer+" Based on question and user answer for given interview question"+
          " please give us a rating for the answer out of 10 and feedback as area of improvement if any in 3-7 lines to improve it in JSON format with a rating field and a feedback field "

          const result=await chatSession.sendMessage(feedbackPrompt);

          const mockJsonResp=(result.response.text()).replace('```json','').replace('```','')
          console.log(mockJsonResp);
          const JsonFeedbackResp=JSON.parse(mockJsonResp);

          const resp=await db.insert(UserAnswer)
          .values({
            mockIdRef:interviewData?.mockId,
            question:mockInterviewQuestion[activeQuestionIndex]?.question,
            correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
          })

          if(resp)
          {
            toast('Your answer has been recorded sucessfully!')
            setUserAnswer('');
            setResults([]);
          }
          else{
            toast('Failed to record answer')
          }
          setResults([])
          
          setLoading(false);
      }


  return (
    <div className='flex items-center justify-center flex-col'>
    <Button 
    disabled={loading}
    variant="outline" className="my-10"
    onClick={StartStopRecording}
    >
        {isRecording?
        <h2 className='text-red-600 flex gap-2'>
            <Mic/> Listening....Click to stop recording
        </h2>
        
        :

        <h2 className='text-blue-600 flex gap-2'>
            <Mic/> Record Answer
        </h2>}</Button>
    </div>
  )
}

export default RecordAnswerSection
