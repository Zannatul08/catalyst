// "use server"
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/prisma";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });

// export const generateAIInsights = async (industry) => {
//   const prompt = `
//           Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
//           {
//             "salaryRanges": [
//               { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//             ],
//             "growthRate": number,
//             "demandLevel": "High" | "Medium" | "Low",
//             "topSkills": ["skill1", "skill2"],
//             "marketOutlook": "Positive" | "Neutral" | "Negative",
//             "keyTrends": ["trend1", "trend2"],
//             "recommendedSkills": ["skill1", "skill2"]
//           }
          
//           IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
//           Include at least 5 common roles for salary ranges.
//           Growth rate should be a percentage.
//           Include at least 5 skills and trends.
//         `; 

//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   const text = response.text();
//   const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
//   const insights = JSON.parse(cleanedText);

//   // Enforce strict validation for demandLevel
//   const validDemandLevels = ["HIGH", "MEDIUM", "LOW"];
//   insights.demandLevel = validDemandLevels.includes(insights.demandLevel?.toUpperCase())
//     ? insights.demandLevel.toUpperCase()
//     : "MEDIUM"; // Default to MEDIUM if invalid

//   // Optional: Add similar validation for marketOutlook
//   const validMarketOutlooks = ["POSITIVE", "NEUTRAL", "NEGATIVE"];
//   insights.marketOutlook = validMarketOutlooks.includes(insights.marketOutlook?.toUpperCase())
//     ? insights.marketOutlook.toUpperCase()
//     : "NEUTRAL"; // Default to NEUTRAL if invalid

//   return insights;
// };

// export async function getIndustryInsights() {
//   const { userId } = await auth();
//   if (!userId) throw new Error("Unauthorized");

//   const user = await db.user.findUnique({
//     where: {
//       clerkUserId: userId,
//     },
//     include :{
//        industryInsight: true,
//     },
//   });

//   if (!user) throw new Error("User not found");

//   if (!user.industryInsight) {
//     const insights = await generateAIInsights(user.industry);
//     const industryInsight = await db.industryInsight.create({
//       data: {
//         industry: user.industry,
//         ...insights,
//         nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     });
//     return industryInsight;
//   }
//   return user.industryInsight;
// }
"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

export const generateAIInsights = async (industry) => {
  const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `; 

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
  const insights = JSON.parse(cleanedText);

  // Enforce strict validation for demandLevel
  const validDemandLevels = ["HIGH", "MEDIUM", "LOW"];
  insights.demandLevel = validDemandLevels.includes(insights.demandLevel?.toUpperCase())
    ? insights.demandLevel.toUpperCase()
    : "MEDIUM"; // Default to MEDIUM if invalid

  // Enforce strict validation for marketOutlook
  const validMarketOutlooks = ["POSITIVE", "NEUTRAL", "NEGATIVE"];
  insights.marketOutlook = validMarketOutlooks.includes(insights.marketOutlook?.toUpperCase())
    ? insights.marketOutlook.toUpperCase()
    : "NEUTRAL"; // Default to NEUTRAL if invalid

  console.log("Generated Insights:", insights); // Debug log
  return insights;
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  console.log("User Industry in getIndustryInsights:", user.industry); // Debug log

  if (!user.industryInsight) {
    if (!user.industry) throw new Error("User industry not set");
    const insights = await generateAIInsights(user.industry);
    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        salaryRanges: insights.salaryRanges || [],
        growthRate: insights.growthRate || 0,
        demandLevel: insights.demandLevel,
        topSkills: insights.topSkills || [],
        marketOutlook: insights.marketOutlook,
        keyTrends: insights.keyTrends || [],
        recommendedSkills: insights.recommendedSkills || [],
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date(),
      },
    });
    return industryInsight;
  }
  return user.industryInsight;
}