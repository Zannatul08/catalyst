Catalyst: An AI-Powered Full-Stack Career Companion
Catalyst is an innovative, all-in-one web application designed to help students, fresh graduates, and professionals navigate their career readiness journey. It addresses the fragmentation in existing platforms by integrating essential tools into a single, intuitive platform, providing a guided and personalized path to becoming job-ready.

Features
AI Resume Builder: A guided resume creation tool with AI suggestions to optimize content. Users can see a live Markdown preview and download their resumes as PDFs.

Mock Interview Module: Generates AI-powered, role-specific questions for mock interviews. It provides instant feedback, detailed explanations, and a performance summary.

Industry Insights Dashboard: Provides up-to-date information on market outlook, industry growth rates, salary ranges, and in-demand skills, all powered by Gemini 1.5 Flash.

Progress Tracker: Analyzes quiz performance over time, displaying average scores, latest scores, and a visual trend to help users monitor their improvement.

To run this project locally, follow these steps:

Clone the repository:
git clone https://github.com/Zannatul08/catalyst.git

Install the dependencies:
npm install

Set up your environment variables (e.g., database connection, API keys).

Install prisma client:
npx prisma generate
npx prisma migrate dev

Run the development server:
npm run dev
