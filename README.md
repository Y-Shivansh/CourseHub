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
- **OAuth Integration** with Google (Auth0)

### 👨‍ Teacher Features
- **Course Creation** with rich descriptions, thumbnails, and categories
- **Course Management** - Edit, update.
- **Dashboard with Stats** - ApexCharts integration for analytics (hard coded as of now)
- **Created Courses Overview** with search functionality
- **Image Upload** for course thumbnails via Cloudinary

### 👨‍ Student Features
- **Course Discovery** - Browse all available courses with search
- **Course Enrollment** with Razorpay payment integration
- **Learning Dashboard** with comprehensive stats and charts (hard coded as of now)
- **Course Details** with instructor information
- **AI Course Assistant** - Get instant help with course-related questions

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
- **Automatic Enrollment** upon successful payment
- **Payment Receipts** will be created in future with unique identifiers 

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
- **ApexCharts Integration** - Line and Donut charts
- **Dashboard Stats** - Role-based comprehensive metrics (hard coded)

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

## 📁 Project Structure

```
CourseHub/
├── 📁 client/                          # React Frontend
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 assets/                  # Images & SVGs
│   │   ├── 📁 components/              # UI Components
│   │   ├── 📁 context/                 # React Context
│   │   ├── 📁 hooks/                   # Custom Hooks
│   │   ├── 📁 layout/                  # Route Layouts
│   │   ├── 📁 pages/                   # Page Components
│   │   ├── 📁 providers/               # Context Providers
│   │   ├── 📁 router/                  # Routing
│   │   ├── 📁 services/                # API Services
│   │   ├── 📁 utils/                   # Utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── 📁 server/                          # Node.js Backend
    ├── 📁 public/
    ├── 📁 src/
    │   ├── 📁 controllers/             # Request Handlers
    │   ├── 📁 middlewares/             # Custom Middlewares
    │   ├── 📁 models/                  # Database Schemas
    │   ├── 📁 routes/                  # API Routes
    │   ├── 📁 schemas/                 # Validation Schemas
    │   ├── 📁 services/                # Business Logic
    │   ├── 📁 utils/                   # Server Utilities
    │   ├── 📁 config/                  # Configuration
    │   ├── app.js
    │   └── server.js
    ├── package.json
    └── eslint.config.mjs
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
- **Automated Course Summaries** and key points extraction
- **AI-powered Course Recommendations** 
- **Intelligent Content Analysis** for course quality assessment
- **Voice-based AI Assistant** for hands-free learning

### 💳 Enhanced Payment Features
- **Multiple Payment Gateways** (Stripe, PayPal)
- **Subscription Models** for premium courses and features
- **Refund Management** with automated processing

### 📹 Advanced Content Management
- **Video Lecture Upload** with streaming capabilities
- **Progress Tracking** with completion certificates
- **Video Streaming** for lecture classes


### 🐳 DevOps & Scalability
- **Docker Containerization** for easy deployment
- **CI/CD Pipeline** with GitHub Actions
- **Load Balancing** and auto-scaling
- **Microservices Architecture** as the platform grows

### 📱 Platform Extensions
- **Mobile Application** (React Native/Flutter)
- **Voice Assistant Integration** (Alexa or Google Assistant)

---

##  API Endpoints

### Authentication Routes (`/api/v1/user/`)
```
POST   /signup          - Register new user
POST   /signin          - User login
POST   /oauth-login     - OAuth user registration/login
GET    /me              - Get current user (Protected)
PUT    /update          - Update user profile (Protected)
DELETE /delete          - Delete user account with complete data 

GET    /sync-indexes    - Database index synchronization (Development) (not always active)
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

**Shivansh Sharma - Reach me at:**
- **GitHub**: [@Y-Shivansh](https://github.com/Y-Shivansh)
- **Email**: sharma.shivansh1305@gmail.com
- **LinkedIn**: [Shivansh Sharma](https://www.linkedin.com/in/shivansh-sharma-73270724b/)
- **Twitter**: [@shivansh_Zz](https://x.com/shivansh_Zz)

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

---

##  Project Statistics

- **⭐ Stars**: Growing daily
- **🔄 Forks**: Contributing to the community
- ** Issues**: Actively maintained
- **🌍 Users**: Global reach

---

**⭐ Star this repository if you find it helpful!**

**🚀 Ready to revolutionize online learning? Start building with CourseHub today!**