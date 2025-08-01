// import { currentUser } from "@clerk/nextjs/server";
// import { getUserOnboardingStatus } from "@/actions/user";
// import { redirect } from "next/navigation";
// import { getIndustryInsights } from "@/actions/dashboard";
// import DashboardView from "./_components/dashboard-view";

// const IndustryInsightsPage = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return <div className="text-red-500 text-center mt-20">User not found</div>;
//   }

//   const { isOnboarded } = await getUserOnboardingStatus(user.id);
//   const insights = await getIndustryInsights();

//   if (!isOnboarded) {
//     redirect("/onboarding");
//   }

//   return (
//   <div className="container mx-auto">
//     <DashboardView insights={insights}/>
//   </div>
//   );

// };

// export default IndustryInsightsPage;

// import { currentUser } from "@clerk/nextjs/server";
// import { getUserOnboardingStatus } from "@/actions/user";
// import { redirect } from "next/navigation";
// import { getIndustryInsights } from "@/actions/dashboard";
// import DashboardView from "./_components/dashboard-view";

// const IndustryInsightsPage = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return <div className="text-red-500 text-center mt-20">User not found</div>;
//   }

//   try {
//     const { isOnboarded } = await getUserOnboardingStatus(); // Remove user.id
//     const insights = await getIndustryInsights();

//     if (!isOnboarded) {
//       redirect("/onboarding");
//     }

//     return (
//       <div className="container mx-auto">
//         <DashboardView insights={insights} />
//       </div>
//     );
//   } catch (error) {
//     console.error("Error in IndustryInsightsPage:", error.message);
//     return <div className="text-red-500 text-center mt-20">Failed to load dashboard</div>;
//   }
// };

// export default IndustryInsightsPage;

import { currentUser } from "@clerk/nextjs/server";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_components/dashboard-view";

const IndustryInsightsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div className="text-red-500 text-center mt-20">User not found</div>;
  }

  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  try {
    const insights = await getIndustryInsights();
    return (
      <div className="container mx-auto">
        <DashboardView insights={insights} />
      </div>
    );
  } catch (error) {
    console.error("Error in IndustryInsightsPage:", error.message);
    return <div className="text-red-500 text-center mt-20">Failed to load dashboard</div>;
  }
};

export default IndustryInsightsPage;