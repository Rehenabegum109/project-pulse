ProjectPulse – Client Feedback & Project Health Tracker
1. Project Overview

ProjectPulse is a full-stack web application designed to help software teams monitor project health, gather structured client feedback, and manage risks efficiently.

Key functionalities:

Clients provide weekly structured feedback.

Employees submit weekly progress updates and report blockers.

Admins monitor overall project health and intervene proactively.

Automatic Project Health Score calculation for quick insights.

2. Tech Stack

Frontend: Next.js, Tailwind CSS

Backend: [Express.js REST API OR Next.js API Routes] → Choose whichever you used

Database: MongoDB Atlas

Authentication: JWT-based

Deployment: Frontend (Vercel), Backend (Render / Railway / Vercel)

3. Backend Choice

I used [Express.js REST API / Next.js API Routes] for handling backend logic.

Role-based access and authentication are implemented using JWT.

4. Features
4.1 Authentication & Access Control

Login system (admin-created users; no public registration)

Role-based route protection (Admin / Employee / Client)

4.2 Project Management (Admin)

Create and manage projects

Assign clients and multiple employees

Set start and end dates, timeline, and status

View automatic Health Score

4.3 Weekly Check-Ins

Employee:

Progress summary

Blockers/challenges

Confidence level (1–5)

Estimated completion %

Client:

Satisfaction rating (1–5)

Communication clarity rating (1–5)

Optional comments

Option to flag issues

4.4 Project Health Score Logic

Health Score is automatically calculated (0–100) using:

Recent client satisfaction ratings

Employee confidence levels

Project progress vs timeline

Number of flagged issues or risks

Health Interpretation:

80–100 → On Track

60–79 → At Risk

Below 60 → Critical

Formula Example:

Health Score = (0.4 * AvgClientSatisfaction) + 
               (0.3 * AvgEmployeeConfidence) + 
               (0.2 * ProjectCompletionPercentage) - 
               (0.1 * NumberOfFlaggedIssues)

4.5 Risk Management

Employees: Add risks with title, severity, mitigation plan, and status
Admins: View all risks and high-risk projects easily

4.6 Dashboards

Admin: Projects grouped by health, missing check-ins, high-risk summary

Employee: Assigned projects, pending check-ins, open risks count

Client: Assigned projects, project health, last feedback

4.7 Activity Timeline

Shows weekly check-ins, feedback, risk updates, and project status changes

5. Setup Instructions
5.1 Clone the repository
git clone https://github.com/yourusername/projectpulse.git
cd projectpulse

5.2 Install dependencies

Frontend:

cd frontend
npm install


Backend (if separate):

cd backend
npm install

5.3 Environment Variables

Create .env file (or copy .env.example) with:

MONGO_URI=MONGO_URI=mongodb+srv://project-pulse:FQmQvJikXglb9jQ0@cluster0134.xqhi49c.mongodb.net/?appName=Cluster0134
JWT_SECRET=9f8c3a4b7d1e2f3c5b6a7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a
PORT=5000

5.4 Seed Demo Users & Projects
npm run seed


This will create:

Admin: mim1@gmail.com/ Mim123

Employee: emp5@example.com / emp123

Client: client2@example.com / client123

Sample projects

5.5 Run Application

Frontend:

npm run dev


Backend (if separate):

npm run dev

6. Demo Credentials
Role	Email	Password
Admin	admin@example.com
	password123
Employee	employee@example.com
	password123
Client	client@example.com
	password123
7. Deployment

Live URL: https://your-live-url.com

Frontend hosted on Vercel

Backend hosted on Render / Railway / Vercel

Database hosted on MongoDB Atlas

8. Demo Video

Link: Google Drive / YouTube Unlisted

Duration: 5–8 minutes

Shows: role-based login, weekly check-ins, health score logic, admin dashboard insights

9. Folder Structure
projectpulse/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── ...
├── backend/ (if using Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
├── .env.example
├── README.md
└── package.json

10. Notes

Partial completion acceptable if core features work

Focused on clean code, proper logic, and responsive UI

No hard-coded data; all data comes from database