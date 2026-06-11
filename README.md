# 🤖 GEN-AI Skill Gap Analyzer

An AI-powered full-stack web application that analyzes your resume and job description to generate a **personalized interview strategy** — including technical questions, behavioral questions, skill gap analysis, and a day-wise preparation roadmap.

🌐 **Live Demo:** [https://gen-ai-skillgap-analyzer-frontend.onrender.com](https://gen-ai-skillgap-analyzer-frontend.onrender.com)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login/register with HTTP-only cookies
- 📄 **Resume Upload** — Upload your PDF resume for AI analysis
- 🤖 **AI-Powered Report Generation** — Powered by Google Gemini AI
- 📊 **Match Score** — See how well your profile matches the job
- ❓ **Technical Questions** — Role-specific questions with intentions and model answers
- 💬 **Behavioral Questions** — STAR-method ready behavioral questions
- 🎯 **Skill Gap Analysis** — Identifies missing skills with severity levels
- 🗺️ **Preparation Roadmap** — Day-wise study plan to ace the interview
- 📱 **Fully Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
|------------|-------|
| React.js | UI Framework |
| React Router | Client-side routing |
| Axios | HTTP requests |
| SCSS | Styling |
| Vite | Build tool |

### Backend
| Technology | Usage |
|------------|-------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File uploads |
| pdf2json | PDF parsing |
| Google Gemini AI | AI report generation |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key


GEN-AI--skillgap-analyzer/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # Express routes
│   │   ├── middleware/        # Auth & file middleware
│   │   ├── services/          # AI service (Gemini)
│   │   └── config/            # DB & env config
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── auth/              # Login, Register, Context
│   │   ├── features/          # Home, Interview pages
│   │   └── app.route.jsx      # Router config
│   └── index.html
│
└── README.md
```
