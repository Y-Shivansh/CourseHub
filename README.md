# 📚 CourseHub - Complete Learning Management System

**CourseHub** is a comprehensive full-stack learning platform built with React.js and Node.js, enabling teachers to create and manage courses while students can discover, enroll, and access learning materials with an intuitive dashboard experience.

---

## 🎯 Current Features (Fully Implemented)

### 🔐 Authentication & Authorization
- **User Registration & Login** with JWT authentication
- **Role-based Access Control** (Teacher/Student)
- **Secure Route Protection** with middleware
- **Profile Management** with image upload via Cloudinary
- **Password Update & Account Deletion** functionality

### 👨‍🏫 Teacher Features
- **Course Creation** with rich descriptions, thumbnails, and categories
- **Course Management** - Edit, update, and delete courses
- **Student Analytics** - View enrolled students per course
- **Dashboard with Stats** - ApexCharts integration for analytics
- **Created Courses Overview** with search functionality

### 👨‍🎓 Student Features
- **Course Discovery** - Browse all available courses with search/filter
- **Course Enrollment** with confirmation popups
- **Learning Dashboard** with comprehensive stats and charts
- **Enrolled Courses Management** - Access and track progress
- **Course Details** with instructor information

### 🎨 UI/UX Features
- **Dark/Light Theme Toggle** with persistent storage
- **Responsive Design** - Mobile-first approach
- **Modern UI Components** - Tailwind CSS with custom design system
- **Smooth Animations** - Framer Motion integration
- **Professional Navigation** - Headless UI components
- **Toast Notifications** - Real-time user feedback
- **Loading States** throughout the application

### 📊 Analytics & Visualization
- **ApexCharts Integration** - Line, Bar, and Donut charts
- **Student Progress Tracking** with visual metrics
- **Teacher Analytics** - Course views, enrollments, growth
- **Dashboard Stats** - Role-based comprehensive metrics
- **Recent Activity Feed** for both user types

### 🛠 Technical Features
- **RESTful API** with Express.js backend
- **MongoDB** with Mongoose ODM
- **Cloudinary Integration** for image uploads
- **Zod Schema Validation** on both client and server
- **Axios Interceptors** for seamless API calls
- **LocalStorage Management** for user data persistence
- **Error Handling** with comprehensive user feedback

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

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for secure authentication
- **Zod** for schema validation
- **Cloudinary** for image storage
- **bcrypt** for password hashing
- **Multer** for file uploads

---

## 📁 Project Structure

```
CourseHub/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── common/     # Shared UI components
│   │   │   ├── Navbar/     # Navigation components
│   │   │   └── profile/    # Profile management
│   │   ├── pages/          # Route pages
│   │   │   ├── dashboard/  # Dashboard pages
│   │   │   └── public/     # Public pages
│   │   ├── services/       # API configuration
│   │   ├── context/        # React contexts
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
│
└── server/                 # Node.js Backend
    ├── src/
    │   ├── controllers/    # Request handlers
    │   ├── models/         # Database schemas
    │   ├── routes/         # API routes
    │   ├── middlewares/    # Custom middlewares
    │   ├── schemas/        # Validation schemas
    │   └── utils/          # Server utilities
    └── package.json        # Backend dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account for image uploads

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
   
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   
   # Create .env file with:
   # VITE_API_BASE_URL=http://localhost:3000/api/v1
   
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

### 💳 Payment Integration
- **Razorpay API** for seamless course enrollment payments
- **Multiple Payment Methods** support
- **Transaction History** and receipt generation
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

---

**⭐ Star this repository if you find it helpful!**
