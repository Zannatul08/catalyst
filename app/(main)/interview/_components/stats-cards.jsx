import {Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Brain } from "lucide-react";
const StatsCards =({assessments}) =>{
    const getAverageScore = ()=>{
        if(!assessments?.length) return 0;
        const total = assessments.reduce(
            (sum, assessments) => sum+ assessments.quizScore,0
        );
        return(total/ assessments.length).toFixed(1);
    };
    const getLatestAssessment =() =>{
        if(!assessments?.length)return null;
        return assessments[0];
    };
    const getTotalQuestions =() =>{
        if(!assessments?.length)return 0;
        return assessments.reduce(
            (sum, assessment) => sum+assessment.questions.length,0
        )
    }
    return <div className="grid gap-4 md:grid-cols-3 mb-6">
         <Card className=" bg-black/30 backdrop-blur-sm border border-gray-700 text-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
               Average Score
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground"/>


        </CardHeader>
        <CardContent>
           <div className="text-2xl font-bold">{getAverageScore()}%</div>
            <p className="text-xs text-muted-foreground">
             Across all assessment
            </p>
        </CardContent>
      </Card>



      <Card className=" bg-black/30 backdrop-blur-sm border border-gray-700 text-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
               Questions Practice
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground"/>


        </CardHeader>
        <CardContent>
           <div className="text-2xl font-bold">{getTotalQuestions()}%</div>
            <p className="text-xs text-muted-foreground">
             Total questions
            </p>
        </CardContent>
      </Card>



      <Card className=" bg-black/30 backdrop-blur-sm border border-gray-700 text-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
               Latest Score
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground"/>


        </CardHeader>
        <CardContent>
           <div className="text-2xl font-bold">{getLatestAssessment()?.quizScore.toFixed(1)|| 0}%</div>
            <p className="text-xs text-muted-foreground">
             Most recent quiz
            </p>
        </CardContent>
      </Card>







    </div>
};

export default StatsCards;
