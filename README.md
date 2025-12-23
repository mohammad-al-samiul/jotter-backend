# Jotter – Storage Management Backend API

Jotter is a complete backend API for managing **notes, files, folders, favorites, calendar views, search, dashboard analytics, and user profiles**.  
It is built with **Node.js, Express.js, MongoDB, and TypeScript**, following clean architecture and best practices.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Zod Validation
- Multer (File Upload)
- Cloudinary (optional)
- Nodemailer (Email & OTP)

---

## 📁 Project Structure

```
project-root/
│
├── public/
│   └── uploads/                # Uploaded files (images, PDFs)
│
├── src/
│   └── app/
│       │
│       ├── config/
│       │   ├── db.ts            # MongoDB connection
│       │   ├── env.ts           # Environment config
│       │   └── multer.ts        # Multer configuration
│       │
│       ├── errors/
│       │   ├── ApiError.ts
│       │   └── error.middleware.ts
│       │
│       ├── middleware/
│       │   ├── auth.middleware.ts
│       │   ├── validateRequest.ts
│       │   ├── rateLimiter.ts
│       │   └── upload.middleware.ts
│       │
│       ├── utils/
│       │   ├── jwt.ts
│       │   ├── catchAsync.ts
│       │   └── fileSize.ts
│       │
│       ├── modules/
│       │   ├── auth/
│       │   ├── notes/
│       │   ├── files/
│       │   ├── folders/
│       │   ├── favourites/
│       │   ├── calendar/
│       │   ├── search/
│       │   ├── profile/
│       │   └── dashboard/
│       │
│       ├── routes/
│       │   └── index.ts         # Central route registry
│       │
│       ├── app.ts               # Express app setup
│       └── server.ts            # Server bootstrap
│
├── .env                         # Environment variables (not committed)
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md                    # 📘 Project documentation
└── package-lock.json


```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=604800

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

```

▶️ Installation & Run

```
npm install
npm run start:dev
Server will run at: http://localhost:5000
```

```
/api/v1
🔐 Authentication APIs

POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/pin/set
POST /auth/pin/verify
📝 Notes APIs

POST /notes
GET /notes/:id
PATCH /notes/:id
DELETE /notes/:id
POST /notes/:id/duplicate
📁 Folder APIs

POST /folders
GET /folders
GET /folders/:id
GET /folders/:id/items
PATCH /folders/:id
DELETE /folders/:id
Folders are logical (database-based) and not created on disk.

📂 File APIs

POST /files (single upload)
POST /files/multiple (multiple upload)
GET /files/:id/view
GET /files/:id/info
PATCH /files/:id/rename
DELETE /files/:id
POST /files/:id/duplicate

File Rules
Supported formats: Images, PDF
Upload via multipart/form-data
Single upload key: file
Multiple upload key: files
File size is stored in bytes and returned as KB / MB / GB

⭐ Favourites APIs

POST /favourites
GET /favourites
DELETE /favourites/:id
Supports favourites for:

Notes
Files
Folders

📅 Calendar API

GET /calendar?date=YYYY-MM-DD
Returns notes and files created on a specific date.

🔍 Global Search API

GET /search?q=keyword
Searches across:

Notes
Files
Folders

👤 Profile APIs

GET /profile
PATCH /profile
PATCH /profile/change-password
DELETE /profile
Password change requires old password

Account deletion performs cascade delete of all user data

📊 Dashboard APIs

GET /dashboard/storage
GET /dashboard/summary
GET /dashboard/recent
Dashboard Features
Storage usage (total / used / available)

Summary counts (folders, notes, images, PDFs)

Recent items (files, notes, folders combined)

🛡️ Security & Architecture
JWT-based authentication
Request validation using Zod
OTP rate limiting
Centralized error handling
Feature-based modular architecture
Controller handles request/response only
Service layer handles business logic

📌 Design Decisions
Folder system is logical, not physical
File duplicate is metadata-based, not physical copy
Database stores raw data; API responses format data for UI
All queries are scoped to authenticated user

📮 API Testing
A complete Postman Collection is provided for testing all endpoints.
Import the collection and configure:

baseUrl
Authorization token

🚀 Future Improvements

Auto-save notes
File sharing with access control
Storage quota enforcement
Activity logs
Cloud storage (AWS S3)

```

