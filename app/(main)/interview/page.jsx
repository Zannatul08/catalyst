import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";


const InterviewPage =async () => {


  const assessments = await getAssessments();

  return <div className="rounded-lg p-8 bg-gradient-to-br from-indigo via-purple-950 to-blue-950 
 ">
 
      <h1 className="text-6xl font-bold gradient-title mb-5">Interview Preparation</h1>

      <div className="space-y-6">
        <StatsCards assessments={assessments}/>
        <PerformanceChart assessments={assessments}/>
        <QuizList assessments={assessments}/>
      </div>
    
  </div>

  
};

  
  export default InterviewPage;