import { currentUser } from "@clerk/nextjs/server";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const IndustryInsightsPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div className="text-red-500 text-center mt-20">User not found</div>;
  }

  const { isOnboarded } = await getUserOnboardingStatus(user.id);

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return <div>IndustryInsightsPage</div>;

};

export default IndustryInsightsPage;