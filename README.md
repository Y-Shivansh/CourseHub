

```markdown:README.md
# 📚 CourseHub - Complete Learning Management System

**CourseHub** is a comprehensive full-stack learning platform built with React.js and Node.js, enabling teachers to create and manage courses while students can discover, enroll, and access learning materials with an intuitive dashboard experience. Now featuring **AI-powered course assistance** for enhanced learning!

## 🌐 Live Preview
🚀 **[View Live Demo](https://coursehub-xi.vercel.app/)**

[![CourseHub Logo](https://coursehub-xi.vercel.app/assets/logo.png)](https://coursehub-xi.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-CourseHub-blue?style=for-the-badge&logo=vercel)](https://coursehub-xi.vercel.app/)

---

##  Current Features (Fully Implemented)

### 🔐 Authentication & Authorization
- **User Registration & Login** with JWT authentication
- **Role-based Access Control** (Teacher/Student)
- **Secure Route Protection** with middleware
- **Profile Management** with image upload via Cloudinary
- **Password Update & Account Deletion** with comprehensive data cleanup
- **Complete Data Integrity** - Removes all user references from courses and enrollments
- **Orphaned Reference Prevention** - Cleans up course enrollments and student lists
- **Secure logout** with token cleanup
- **OAuth Integration** with Google and GitHub (Auth0)

### 👨‍ Teacher Features
- **Course Creation** with rich descriptions, thumbnails, and categories
- **Course Management** - Edit, update, and delete courses
- **Student Analytics** - View enrolled students per course
- **Dashboard with Stats** - ApexCharts integration for analytics
- **Created Courses Overview** with search functionality
- **Course Update Interface** with live preview and enrolled students display
- **Image Upload** for course thumbnails via Cloudinary

### 👨‍ Student Features
- **Course Discovery** - Browse all available courses with search/filter
- **Course Enrollment** with Razorpay payment integration
- **Learning Dashboard** with comprehensive stats and charts
- **Enrolled Courses Management** - Access and track progress
- **Course Details** with instructor information
- **Payment History** and enrollment tracking
- **🤖 AI Course Assistant** - Get instant help with course-related questions

### 🤖 AI-Powered Features (NEW!)
- **Google Gemini AI Integration** for intelligent course assistance
- **Course-Specific Chatbot** that understands course context
- **Conversation Memory** - Remembers previous interactions
- **Smart Responses** with course-specific explanations
- **User-Friendly Interface** with real-time chat experience
- **Context-Aware Assistance** - Only helps with course-related questions
- **Auto-cleanup** - Chat history expires after 30 days

### 💳 Payment Integration
- **Razorpay Payment Gateway** for secure transactions
- **Order Creation** and verification system
- **Payment Status Tracking** with database logging
- **Automatic Enrollment** upon successful payment
- **Payment Receipts** with unique identifiers

### 🎨 UI/UX Features
- **Dark/Light Theme Toggle** with persistent storage
- **Responsive Design** - Mobile-first approach
- **Modern UI Components** - Tailwind CSS with custom design system
- **Smooth Animations** - Framer Motion integration
- **Professional Navigation** - Headless UI components
- **Toast Notifications** - Real-time user feedback
- **Loading States** throughout the application
- **Interactive Modals** for confirmations and forms
- **Beautiful Blob Backgrounds** for enhanced visual appeal

### 📊 Analytics & Visualization
- **ApexCharts Integration** - Line, Bar, and Donut charts
- **Student Progress Tracking** with visual metrics
- **Teacher Analytics** - Course views, enrollments, growth
- **Dashboard Stats** - Role-based comprehensive metrics
- **Recent Activity Feed** for both user types

###  Technical Features
- **RESTful API** with Express.js backend
- **MongoDB** with Mongoose ODM
- **Data Integrity Management** - Complete cleanup of orphaned references
- **Cloudinary Integration** for image uploads and management
- **Razorpay Integration** for payment processing
- **Google Gemini AI** for intelligent assistance
- **Zod Schema Validation** on both client and server
- **Axios Interceptors** for seamless API calls
- **LocalStorage Management** for user data persistence
- **Error Handling** with comprehensive user feedback
- **File Upload** with Multer middleware
- **JWT Token Management** with automatic role detection
- **Database Cleanup** - Automatic removal of orphaned data

---

## 🏗 Tech Stack

### Frontend
- **React.js 19** with Vite for fast development
- **Tailwind CSS 4** with custom design system
- **React Router v7** for navigation
- **ApexCharts** for data visualization
- **Framer Motion** for smooth animations
- **Headless UI** for accessible components
- **Lucide React** for modern icons
- **React Toastify** for notifications
- **JWT Decode** for token management
- **React Modern Drawer** for mobile navigation

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **Zod** for schema validation
- **Cloudinary** for image storage and management
- **Razorpay** for payment processing
- **Google Generative AI** for chatbot functionality
- **bcrypt** for password hashing
- **Multer** for file uploads
- **Nanoid** for unique ID generation
- **Nodemailer** for email functionality

---

## 📁 Updated Project Structure

```
CourseHub/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Images, SVGs, static files
│   │   │   ├── logo.png
│   │   │   ├── defaultThumbnail.png
│   │   │   ├── defaultProfile.png
│   │   │   ├── profileAvatar.svg
│   │   │   ├── hero.svg
│   │   │   ├── lightBlob.svg
│   │   │   ├── darkBlob.svg
│   │   │   ├── teacher-lightBlob.svg
│   │   │   └── teacher-darkBlob.svg
│   │   ├── components/              # Reusable UI components
│   │   │   ├── auth/                # Authentication components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   ├── modals/          # Authentication modals
│   │   │   │   │   ├── EnrollPopup.jsx
│   │   │   │   │   ├── UpdatePassPopUp.jsx
│   │   │   │   │   ├── DeleteAccountPopup.jsx
│   │   │   │   │   └── LogoutPopup.jsx
│   │   │   │   └── oAuth/           # OAuth components
│   │   │   │       └── OAuthButton.jsx
│   │   │   ├── chatbot/             # AI Chatbot components (NEW!)
│   │   │   │   ├── ChatbotPopup.jsx
│   │   │   │   ├── ChatbotUI.jsx
│   │   │   │   ├── ChatInput.jsx
│   │   │   │   └── MessageBubble.jsx
│   │   │   ├── common/              # Shared UI components
│   │   │   │   ├── AllCoursesSection.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── CourseCard.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── BaseModal.jsx
│   │   │   │   ├── ThemeToggle.jsx
│   │   │   │   ├── UserDetailsCard.jsx
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   └── DashboardStats.jsx
│   │   │   ├── design/              # Design components
│   │   │   │   ├── BlobBackground.jsx
│   │   │   │   └── TeacherBlobBackground.jsx
│   │   │   ├── landing/             # Landing page components
│   │   │   │   └── Hero.jsx
│   │   │   ├── Navbar/              # Navigation components
│   │   │   │   ├── DashboardNavbar.jsx
│   │   │   │   ├── PublicNavbar.jsx
│   │   │   │   └── sidebar/         # Sidebar components
│   │   │   │       ├── Sidebar.jsx
│   │   │   │       ├── ProfileCard.jsx
│   │   │   │       ├── SidebarLinks.jsx
│   │   │   │       └── AccountSettings.jsx
│   │   │   ├── profile/             # Profile management
│   │   │   │   ├── AllEnrolledCourses.jsx
│   │   │   │   ├── UpdateProfileForm.jsx
│   │   │   │   ├── AllCreatedCourses.jsx
│   │   │   │   └── teacher/         # Teacher-specific components
│   │   │   │       ├── MyCreatedCourseDetail.jsx
│   │   │   │       └── EditCourseDetails.jsx
│   │   │   └── layout/              # Layout components
│   │   │       └── DashboardLayout.jsx
│   │   ├── context/                 # React Context
│   │   │   └── themeContext.js
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useTheme.js
│   │   ├── layout/                  # Route layouts
│   │   │   └── ProtectedLayout.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── dashboard/           # Dashboard pages
│   │   │   │   ├── student/         # Student pages
│   │   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   │   ├── MyEnrolledCourses.jsx
│   │   │   │   │   └── EnrolledCourse.jsx
│   │   │   │   └── teacher/         # Teacher pages
│   │   │   │       ├── TeacherDashboard.jsx
│   │   │   │       ├── CreateCourse.jsx
│   │   │   │       ├── CourseUpdate.jsx
│   │   │   │       └── MyCreatedCourses.jsx
│   │   │   ├── public/              # Public pages
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   ├── CourseDetails.jsx
│   │   │   │   └── OauthRoleSelection.jsx
│   │   │   └── UpdateProfile.jsx    # Shared profile update
│   │   ├── providers/               # Context providers
│   │   │   └── ThemeProvider.jsx
│   │   ├── router/                  # Routing configuration
│   │   │   └── AppRoutes.jsx
│   │   ├── services/                # API services
│   │   │   └── axios.config.js
│   │   ├── utils/                   # Utility functions
│   │   │   ├── getCategoryIcon.jsx
│   │   │   └── getUserRoleFromToken.js
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies & scripts
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.js               # Vite build configuration
│   ├── eslint.config.js             # ESLint configuration
│   └── vercel.json                  # Vercel deployment config
│
└── server/                          # Node.js Backend
    ├── public/                      # Static files
    │   └── temp/                    # Temporary file storage
    ├── src/
    │   ├── controllers/             # Request handlers
    │   │   ├── userControllers.js
    │   │   ├── courseControllers.js
    │   │   ├── payment.controller.js
    │   │   └── aiController.js      # AI Chatbot controller (NEW!)
    │   ├── middlewares/             # Custom middlewares
    │   │   ├── user.middleware.js
    │   │   ├── authorizeRoles.js
    │   │   └── multer.middleware.js
    │   ├── models/                  # Database schemas
    │   │   ├── User.model.js
    │   │   ├── Course.model.js
    │   │   ├── Payment.model.js
    │   │   ├── DeletionLog.js
    │   │   └── ChatMessage.model.js # Chat messages model (NEW!)
    │   ├── routes/                  # API route definitions
    │   │   ├── userRoutes.js
    │   │   ├── courseRoutes.js
    │   │   ├── payment.routes.js
    │   │   └── ai/                  # AI routes (NEW!)
    │   │       └── gemini.routes.js
    │   ├── schemas/                 # Zod validation schemas
    │   │   ├── user.schema.js
    │   │   └── course.schema.js
    │   ├── services/                # Business logic services
    │   │   ├── enrollUserToCourse.js
    │   │   └── geminiService.js     # Gemini AI service (NEW!)
    │   ├── utils/                   # Server utilities
    │   │   ├── generateToken.js
    │   │   ├── sendEmail.js
    │   │   ├── cloudinary.js
    │   │   └── razorpay.js
    │   ├── config/                  # Configuration files
    │   │   ├── db.config.js
    │   │   └── jwt.config.js
    │   ├── app.js                   # Express app configuration
    │   └── server.js                # Server entry point
    ├── .env                         # Environment variables
    ├── package.json                 # Dependencies & scripts
    └── eslint.config.mjs            # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account for image uploads
- Razorpay account for payment processing
- **Google Gemini API key** for AI chatbot functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Y-Shivansh/CourseHub.git
   cd CourseHub
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   
   # Create .env file with:
   # MONGODB_URI=your_mongodb_connection
   # JWT_SECRET=your_jwt_secret
   # CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   # CLOUDINARY_API_KEY=your_api_key
   # CLOUDINARY_API_SECRET=your_api_secret
   # RAZORPAY_KEY_ID=your_razorpay_key_id
   # RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   # GEMINI_API_KEY=your_gemini_api_key
   # EMAIL_USER=your_gmail_address
   # EMAIL_PASS=your_gmail_app_password
   
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   
   # Create .env file with:
   # VITE_API_BASE_URL=http://localhost:3000/api/v1
   # VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   # VITE_AUTH0_DOMAIN=your_auth0_domain
   # VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

---

## 🔮 Enhanced Future Scope

### 🤖 Advanced AI Integration
- **Multi-Modal AI Support** - Image and document analysis
- **Personalized Learning Paths** based on AI analysis
- **Automated Course Summaries** and key points extraction
- **AI-powered Course Recommendations** with advanced algorithms
- **Intelligent Content Analysis** for course quality assessment
- **Voice-based AI Assistant** for hands-free learning
- **AI-generated Practice Questions** and quizzes

### 💳 Enhanced Payment Features
- **Multiple Payment Gateways** (Stripe, PayPal, Apple Pay)
- **Subscription Models** for premium courses and features
- **Discount Coupons** and promotional codes system
- **Refund Management** with automated processing
- **Split Payments** for expensive courses
- **International Payment Support** with currency conversion

### 🔐 Enhanced Authentication & Security
- **Multi-factor Authentication** (SMS, Email, Authenticator apps)
- **Biometric Authentication** for mobile devices
- **Social Login** with profile synchronization
- **Advanced Role Management** with custom permissions
- **Session Management** with device tracking
- **GDPR Compliance** tools and data export

### 📹 Advanced Content Management
- **Video Lecture Upload** with streaming capabilities
- **Interactive Quizzes** with real-time feedback
- **Progress Tracking** with completion certificates
- **Discussion Forums** with moderation tools
- **Live Streaming** for real-time classes
- **Screen Recording** for course creation
- **Content Versioning** for course updates

###  Advanced Analytics & Insights
- **Learning Analytics** with detailed progress tracking
- **Predictive Analytics** for student success
- **Heat Maps** for course engagement
- **A/B Testing** for course optimization
- **Real-time Analytics Dashboard** for teachers
- **Student Performance Reports** with actionable insights

### 🐳 DevOps & Scalability
- **Docker Containerization** for easy deployment
- **Kubernetes Orchestration** for large-scale deployments
- **CI/CD Pipeline** with GitHub Actions
- **Load Balancing** and auto-scaling
- **Microservices Architecture** as the platform grows
- **CDN Integration** for global content delivery
- **Database Sharding** for performance optimization

### 📱 Platform Extensions
- **Mobile Application** (React Native/Flutter)
- **Progressive Web App** (PWA) with offline capabilities
- **Desktop Application** (Electron)
- **Smart TV App** for living room learning
- **Wearable Integration** for learning reminders
- **Voice Assistant Integration** (Alexa, Google Assistant)

### 🎮 Gamification & Engagement
- **Achievement System** with badges and certificates
- **Leaderboards** for competitive learning
- **Learning Streaks** and daily challenges
- **Virtual Rewards** and points system
- **Social Learning** with study groups
- **Mentorship Programs** with AI matching

### 🔗 Integrations & APIs
- **LMS Integration** (Canvas, Moodle, Blackboard)
- **Calendar Integration** (Google Calendar, Outlook)
- **Communication Tools** (Slack, Discord, Teams)
- **Cloud Storage** (Google Drive, Dropbox, OneDrive)
- **Video Conferencing** (Zoom, Teams, Meet)
- **Third-party APIs** for additional features

---

##  API Endpoints

### Authentication Routes (`/api/v1/user/`)
```
POST   /signup          - Register new user
POST   /signin          - User login
POST   /oauth-login     - OAuth user registration/login
GET    /me              - Get current user (Protected)
PUT    /update          - Update user profile (Protected)
DELETE /delete          - Delete user account with complete data cleanup (Protected)
GET    /sync-indexes    - Database index synchronization (Development)
```

### Course Routes (`/api/v1/course/`)
```
# Public Routes
GET    /all             - Get all courses
GET    /:id             - Get course by ID
GET    /teacher/:id     - Get courses by specific teacher

# Student Routes (Protected)
GET    /unenrolled      - Get courses not enrolled by student
GET    /enrolled        - Get student's enrolled courses
GET    /enrolled/:id    - Get enrolled course details

# Teacher Routes (Protected)
POST   /create          - Create new course
GET    /my-courses      - Get teacher's created courses
PUT    /update/:id      - Update course details
```

### Payment Routes (`/api/v1/payment/`)
```
POST   /create-order    - Create Razorpay order (Protected)
POST   /verify-payment  - Verify payment and enroll (Protected)
```

### AI Routes (`/api/v1/ai/`) - NEW!
```
POST   /chat           - AI chatbot conversation (Protected)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add proper error handling and validation
- Include comprehensive tests for new features
- Update documentation for any API changes
- Ensure responsive design for all new components

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍ Author

**Shivansh Sharma**
- **GitHub**: [@Y-Shivansh](https://github.com/Y-Shivansh/CourseHub)
- **Email**: sharma.shivansh1305@gmail.com
- **LinkedIn**: [Shivansh Sharma](https://www.linkedin.com/in/shivansh-sharma-73270724b/)
- **Twitter**: [@shivansh_Zz](https://x.com/shivansh_Zz)
- **Phone**: +91 6398799630

---

##  Acknowledgments

- **React.js Community** for the robust frontend framework
- **Node.js & Express** for the powerful backend foundation
- **MongoDB** for flexible data storage
- **Tailwind CSS** for the beautiful UI system
- **ApexCharts** for stunning data visualizations
- **Cloudinary** for seamless image management
- **Razorpay** for secure payment processing
- **Google Gemini AI** for intelligent assistance capabilities
- **Vercel** for seamless deployment and hosting
- **Open Source Community** for continuous inspiration and support

---

##  Project Statistics

- **⭐ Stars**: Growing daily
- **🔄 Forks**: Contributing to the community
- ** Issues**: Actively maintained
- **📦 Downloads**: Increasing adoption
- **🌍 Users**: Global reach

---

**⭐ Star this repository if you find it helpful!**

**🚀 Ready to revolutionize online learning? Start building with CourseHub today!**
```