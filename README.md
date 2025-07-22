# 📚 CourseHub - Complete Learning Management System

**CourseHub** is a comprehensive full-stack learning platform built with React.js and Node.js, enabling teachers to create and manage courses while students can discover, enroll, and access learning materials with an intuitive dashboard experience.

## 🌐 Live Preview
🚀 **[View Live Demo](https://coursehub-xi.vercel.app/)**

[![CourseHub Preview](https://api.microlink.io/?url=https://coursehub-xi.vercel.app/&screenshot=true&meta=false&embed=screenshot.url)](https://coursehub-xi.vercel.app/)


---

## 🎯 Current Features (Fully Implemented)

### 🔐 Authentication & Authorization
- **User Registration & Login** with JWT authentication
- **Role-based Access Control** (Teacher/Student)
- **Secure Route Protection** with middleware
- **Profile Management** with image upload via Cloudinary
- **Password Update & Account Deletion** functionality
- **Secure logout** with token cleanup

### 👨‍🏫 Teacher Features
- **Course Creation** with rich descriptions, thumbnails, and categories
- **Course Management** - Edit, update, and delete courses
- **Student Analytics** - View enrolled students per course
- **Dashboard with Stats** - ApexCharts integration for analytics
- **Created Courses Overview** with search functionality
- **Course Update Interface** with live preview and enrolled students display
- **Image Upload** for course thumbnails via Cloudinary

### 👨‍🎓 Student Features
- **Course Discovery** - Browse all available courses with search/filter
- **Course Enrollment** with Razorpay payment integration
- **Learning Dashboard** with comprehensive stats and charts
- **Enrolled Courses Management** - Access and track progress
- **Course Details** with instructor information
- **Payment History** and enrollment tracking

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

### 📊 Analytics & Visualization
- **ApexCharts Integration** - Line, Bar, and Donut charts
- **Student Progress Tracking** with visual metrics
- **Teacher Analytics** - Course views, enrollments, growth
- **Dashboard Stats** - Role-based comprehensive metrics
- **Recent Activity Feed** for both user types

### 🛠 Technical Features
- **RESTful API** with Express.js backend
- **MongoDB** with Mongoose ODM
- **Cloudinary Integration** for image uploads and management
- **Razorpay Integration** for payment processing
- **Zod Schema Validation** on both client and server
- **Axios Interceptors** for seamless API calls
- **LocalStorage Management** for user data persistence
- **Error Handling** with comprehensive user feedback
- **File Upload** with Multer middleware

---

## 🏗 Tech Stack

### Frontend
- **React.js 18** with Vite for fast development
- **Tailwind CSS** with custom design system
- **React Router v6** for navigation
- **ApexCharts** for data visualization
- **Framer Motion** for smooth animations
- **Headless UI** for accessible components
- **Lucide React** for modern icons
- **React Toastify** for notifications
- **JWT Decode** for token management

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **Zod** for schema validation
- **Cloudinary** for image storage and management
- **Razorpay** for payment processing
- **bcrypt** for password hashing
- **Multer** for file uploads
- **Nanoid** for unique ID generation

---

## 📁 Project Structure

```
CourseHub/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/                  # Images, SVGs, static files
│   │   │   ├── logo.png
│   │   │   ├── defaultThumbnail.png
│   │   │   ├── profileAvatar.svg
│   │   │   ├── lightBlob.svg
│   │   │   └── darkBlob.svg
│   │   ├── components/              # Reusable UI components
│   │   │   ├── auth/                # Authentication components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   └── modals/          # Authentication modals
│   │   │   │       ├── EnrollPopup.jsx
│   │   │   │       ├── UpdatePassPopUp.jsx
│   │   │   │       ├── DeleteAccountPopup.jsx
│   │   │   │       └── LogoutPopup.jsx
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
│   │   │   │   └── TeacherBlobBackgroung.jsx
│   │   │   ├── Landing/             # Landing page components
│   │   │   │   └── Hero.jsx
│   │   │   ├── Navbar/              # Navigation components
│   │   │   │   ├── DashboardNavbar.jsx
│   │   │   │   ├── PublicNavbar.jsx
│   │   │   │   └── sidebar/         # Sidebar components
│   │   │   │       ├── Sidebar.jsx
│   │   │   │       ├── ProfileCard.jsx
│   │   │   │       ├── SidebarLinks.jsx
│   │   │   │       └── AccountSettings.jsx
│   │   │   └── profile/             # Profile management
│   │   │       ├── AllEnrolledCourses.jsx
│   │   │       ├── UpdateProfileForm.jsx
│   │   │       ├── AllCreatedCourses.jsx
│   │   │       └── teacher/         # Teacher-specific components
│   │   │           ├── MyCreatedCourseDetail.jsx
│   │   │           └── EditCourseDetails.jsx
│   │   ├── context/                 # React Context
│   │   │   └── themeContext.js
│   │   ├── hooks/                   # Custom React hooks
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
│   │   │   │   └── CourseDetails.jsx
│   │   │   └── UpdateProfile.jsx    # Shared profile update
│   │   ├── providers/               # Context providers
│   │   │   └── ThemeProvider.jsx
│   │   ├── router/                  # Routing configuration
│   │   │   └── AppRoutes.jsx
│   │   ├── services/                # API services
│   │   │   └── axios.config.js
│   │   ├── utils/                   # Utility functions
│   │   │   ├── getCategoryIcon.js
│   │   │   └── getUserRoleFromToken.js
│   │   ├── App.jsx                  # Main App component
│   │   ├── main.jsx                 # App entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies & scripts
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vite.config.js               # Vite build configuration
│   └── eslint.config.js             # ESLint configuration
│
└── server/                          # Node.js Backend
    ├── public/                      # Static files
    │   └── temp/                    # Temporary file storage
    ├── src/
    │   ├── controllers/             # Request handlers
    │   │   ├── userControllers.js
    │   │   ├── courseControllers.js
    │   │   └── payment.controller.js
    │   ├── middlewares/             # Custom middlewares
    │   │   ├── user.middleware.js
    │   │   ├── authorizeRoles.js
    │   │   └── multer.middleware.js
    │   ├── models/                  # Database schemas
    │   │   ├── user.model.js
    │   │   ├── Course.model.js
    │   │   ├── Payment.model.js
    │   │   └── DeletionLog.js
    │   ├── routes/                  # API route definitions
    │   │   ├── userRoutes.js
    │   │   ├── courseRoutes.js
    │   │   └── payment.routes.js
    │   ├── schemas/                 # Zod validation schemas
    │   │   ├── user.schema.js
    │   │   └── course.schema.js
    │   ├── services/                # Business logic services
    │   │   └── enrollUserToCourse.js
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

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivanshsharma8834/CourseHub.git
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
   
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   
   # Create .env file with:
   # VITE_API_BASE_URL=http://localhost:3000/api/v1
   # VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

---

## 🔮 Future Scope

### 🤖 AI Integration
- **OpenAI API Integration** for automatic course summaries
- **AI-powered Course Recommendations** based on student preferences
- **Intelligent Content Analysis** for course quality assessment

### 💳 Enhanced Payment Features
- **Multiple Payment Gateways** (Stripe, PayPal integration)
- **Subscription Models** for premium courses
- **Discount Coupons** and promotional codes
- **Refund Management** system

### 🔐 Enhanced Authentication
- **OAuth 2.0 Integration** for Google and GitHub login
- **Multi-factor Authentication** for enhanced security
- **Social Login** with profile synchronization

### 🐳 DevOps & Scalability
- **Docker Containerization** for easy deployment
- **Kubernetes** orchestration for large-scale deployments
- **CI/CD Pipeline** with GitHub Actions
- **Load Balancing** for high availability
- **Microservices Architecture** as the platform grows

### 📹 Content Management (Long-term)
- **Video Lecture Upload** and streaming
- **Interactive Quizzes** and assessments
- **Progress Tracking** with completion certificates
- **Discussion Forums** for student-teacher interaction
- **Live Streaming** capabilities for real-time classes

### 📱 Platform Extensions
- **Mobile Application** (React Native)
- **Progressive Web App** (PWA) features
- **Offline Content Access** for downloaded materials
- **Push Notifications** for course updates

---

## 🛠 API Endpoints

### Authentication Routes (`/api/v1/user/`)
```
POST   /signup          - Register new user
POST   /signin          - User login
GET    /me              - Get current user (Protected)
PUT    /update          - Update user profile (Protected)
DELETE /delete          - Delete user account (Protected)
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

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shivansh Sharma**
- GitHub: [@shivanshsharma8834](https://github.com/shivanshsharma8834)
- Email: shivanshsharma8834@gmail.com

---

## 🙏 Acknowledgments

- **React.js Community** for the robust frontend framework
- **Node.js & Express** for the powerful backend foundation
- **MongoDB** for flexible data storage
- **Tailwind CSS** for the beautiful UI system
- **ApexCharts** for stunning data visualizations
- **Cloudinary** for seamless image management
- **Razorpay** for secure payment processing

---

**⭐ Star this repository if you find it helpful!**
