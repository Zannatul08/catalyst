"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { format } from "date-fns";
import QuizResult from "./quiz-result";

const QuizList =({assessments}) =>{
    const router = useRouter();
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    return(
        <>
         <Card className=" bg-black/30 backdrop-blur-sm border border-gray-700 text-white shadow-2xl">
        <CardHeader className="flex items-center flex-row justify-between">
            <div>
            <CardTitle className="gradient-title text-3xl md:text-4xl">
               Recent Quizzes
                </CardTitle>
         <CardDescription>Review your past quiz performance</CardDescription>

         </div>

         <Button className="cursor-pointer  hover:shadow-purple-400 duration-200" onClick={()=> router.push("/interview/mock")}>
            Start New Quiz
         </Button>



        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {assessments.map((assessment,i)=>{
                    return(

                        <Card 
                        key={assessment.id}
                        onClick={()=> setSelectedQuiz(assessment)}
                        className="bg-black/30 backdrop-blur-sm border border-gray-700 text-white shadow-2xl cursor-pointer hover:border-purple-400 transition-colors duration-200 " >
        <CardHeader>
            <CardTitle className="text-sm font-medium">
               Quiz {i+1}
                </CardTitle>
                <CardDescription className="flex justify-between w-full">
                    <div>
                        Score:{assessment.quizScore.toFixed(1)}%
                    </div>
                    <div>
                        {format(new Date(assessment.createdAt),
                    "MMMM dd, yyyy HH:mm")}
                    </div>

                </CardDescription>

               

        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                {assessment.improvementTip}
            </p>
           
        </CardContent>
      </Card>

                    )
                })}

            </div>
          
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => 
    setSelectedQuiz(null)
  }>
 
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
        <DialogTitle>Quiz Result</DialogTitle>
  
      
      </DialogHeader>
      <QuizResult
      result={selectedQuiz}
      onStartNew={()=> router.push("/interview/mock")}
      hideStartNew
      />
      
    
  </DialogContent>
</Dialog>




      </>
)
};

export default QuizList;
