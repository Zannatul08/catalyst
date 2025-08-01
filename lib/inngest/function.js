// import { inngest } from "./client";
// import {db} from "../prisma"
// import { GoogleGenerativeAI } from "@google/generative-ai";



// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });




// export const generateIndustryInsights = inngest.createFunction(
//     { name: "Generate Industry Insights" },
//   { cron: "0 0 * * 0" },
//   async ({ step }) => {
//     const industries = await step.run("Fetch industries", async () => {
//       return await db.industryInsight.findMany({
//         select: { industry: true },
//       });
//     });
//     for(const {industry} of industries){
//          const prompt = `
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
//         const res=await step.ai.wrap("gemini",async(p)=>{
//            return  await model.generateContent(p)
//         },prompt);
//         const text=res.response.candidates[0].content.parts[0].text || "";
//         const cleanedText=text.replace(/```(?:json)?\n?/g,"").trim();
//         const insights = JSON.parse(cleanedText);

//         await step.run(`Update ${industry} insights`,async()=>{
//             await db.industryInsight.update({
//                 where:{industry},
//                 data:{
               
//                     ...insights,
//                     lastUpdate:new Date(),
//                     nextUpdate:new Date(Date.now()+7*24*60*60*1000),
//                 },
//             });
//         });
//     }
//   }
// );



// // import { inngest } from "./client";

// // export const helloWorld = inngest.createFunction(
// //   { id: "hello-world" },
// //   { event: "test/hello.world" },
// //   async ({ event, step }) => {
// //     await step.sleep("wait-a-moment", "1s");
// //     return { message: `Hello ${event.data.email}!` };
// //   },
// // );


import { inngest } from "./client";
import { db } from "../prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" },
  async ({ step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
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

      const res = await step.ai.wrap("gemini", async (p) => {
        return await model.generateContent(p);
      }, prompt);

      const text = res.response.candidates[0].content.parts[0].text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
      const insights = JSON.parse(cleanedText);

      // ✅ Convert to Prisma-safe enums
      insights.demandLevel = insights.demandLevel.toUpperCase();        // HIGH, MEDIUM, LOW
      insights.marketOutlook = insights.marketOutlook.toUpperCase();    // POSITIVE, NEUTRAL, NEGATIVE

      // (Optional) Defensive check — prevent crash if enum is wrong
      const DEMAND_ENUM = ["HIGH", "MEDIUM", "LOW"];
      const OUTLOOK_ENUM = ["POSITIVE", "NEUTRAL", "NEGATIVE"];

      if (!DEMAND_ENUM.includes(insights.demandLevel)) {
        throw new Error(`Invalid demandLevel received: ${insights.demandLevel}`);
      }

      if (!OUTLOOK_ENUM.includes(insights.marketOutlook)) {
        throw new Error(`Invalid marketOutlook received: ${insights.marketOutlook}`);
      }

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
          },
        });
      });
    }
  }
);
