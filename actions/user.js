// "use server";
// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { _success } from "zod/v4/core";
// import { generateAIInsights } from "./dashboard";

// export async function updateUser(data){
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//         where:{
//             clerkUserId: userId,
//         },
//     });

//     if (!user) throw new Error("User not found");

//     try{
//         const result = await db.$transaction(async (tx) => {
//             // Find if the industry exists
//             let industryInsight = await tx.industryInsight.findUnique({
//             where: {
//                industry: data.industry,
//             },
//             });
//         // If the industry doesn't exist, create it with default values - will replace it with ai later
//          if(!industryInsight){
//         const insights = await generateAIInsights(data.industry);
       
//                industryInsight = await db.industryInsight.create({
//                 data: {
//                    industry: data.industry,
//                    ...insights,
//                    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//                 },
       
//               });
//          }
//         // update the user
//         const updatedUser = await tx.user.update({
//            where: {
//                id: user.id,
//            },
//            data: {
//               industry: data.industry,
//               experience: data.experience,
//               bio: data.bio,
//               skills: data.skills,
//            },
//         });
//          return { updatedUser, industryInsight};
//         },
//          {
//             timeout: 10000, //default:5000
//         }
//     );
//     return {success: true, ...result};
        
//     } catch(error) {
//         console.error("Error updating user and industry:", error.message);
//         throw new Error("Failed to update profile" + error.message);

//     }
// }

// export async function getUserOnboardingStatus(){
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");

//     const user = await db.user.findUnique({
//         where:{
//             clerkUserId: userId,
//         },
//     });

//     if (!user) throw new Error("User not found");

//     try {
//         const user = await db.user.findUnique({
//             where: {
//                 clerkUserId: userId,
//             },
//             select: {
//                 industry: true,
//             },
//         });
//         return {
//             isOnboarded: !!user?.industry,
//         };

//     } catch (error){
//         console.error("Error checking onboarding status:", error.message);
//         throw new Error("Failed to check onboarding status");

//     }
// }

// "use server";
// import { db } from "@/lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { _success } from "zod/v4/core";
// import { generateAIInsights } from "./dashboard";

// export async function updateUser(data) {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: {
//       clerkUserId: userId,
//     },
//   });

//   if (!user) throw new Error("User not found");

//   try {
//     const result = await db.$transaction(async (tx) => {
//       // Find if the industry exists
//       let industryInsight = await tx.industryInsight.findUnique({
//         where: {
//           industry: data.industry,
//         },
//       });
//       // If the industry doesn't exist, create it with default values
//       if (!industryInsight) {
//         const insights = await generateAIInsights(data.industry);
//         const validDemandLevel = insights.demandLevel?.toUpperCase() || "MEDIUM"; // Normalize to uppercase or default to MEDIUM
//         industryInsight = await db.industryInsight.create({
//           data: {
//             industry: data.industry,
//             demandLevel: validDemandLevel, // Ensure it matches HIGH, MEDIUM, or LOW
//             ...insights,
//             nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//           },
//         });
//       }
//       // Update the user
//       const updatedUser = await tx.user.update({
//         where: {
//           id: user.id,
//         },
//         data: {
//           industry: data.industry,
//           experience: data.experience,
//           bio: data.bio,
//           skills: data.skills,
//         },
//       });
//       return { updatedUser, industryInsight };
//     }, {
//       timeout: 10000, // default: 5000
//     });
//     return { success: true, ...result };
//   } catch (error) {
//     console.error("Error updating user and industry:", error.message);
//     throw new Error("Failed to update profile" + error.message);
//   }
// }

// export async function getUserOnboardingStatus() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: {
//       clerkUserId: userId,
//     },
//   });

//   if (!user) throw new Error("User not found");

//   try {
//     const user = await db.user.findUnique({
//       where: {
//         clerkUserId: userId,
//       },
//       select: {
//         industry: true,
//       },
//     });
//     return {
//       isOnboarded: !!user?.industry,
//     };
//   } catch (error) {
//     console.error("Error checking onboarding status:", error.message);
//     throw new Error("Failed to check onboarding status");
//   }
// }

"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { _success } from "zod/v4/core";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(async (tx) => {
      // Find if the industry exists
      let industryInsight = await tx.industryInsight.findUnique({
        where: {
          industry: data.industry,
        },
      });
      // If the industry doesn't exist, create it with default values
      if (!industryInsight) {
        const insights = await generateAIInsights(data.industry);
        const validDemandLevel = insights.demandLevel?.toUpperCase() || "MEDIUM"; // Normalize to uppercase or default to MEDIUM
        industryInsight = await db.industryInsight.create({
          data: {
            industry: data.industry,
            demandLevel: validDemandLevel, // Ensure it matches HIGH, MEDIUM, or LOW
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }
      // Update the user
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });
      return { updatedUser, industryInsight };
    }, {
      timeout: 10000, // default: 5000
    });
    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile" + error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  console.log("Clerk User ID:", userId);
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  console.log("Found User:", user);
  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });
    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}