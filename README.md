# Task Management Web Application

A full-stack task management application built with React.js and Node.js, featuring JWT authentication, CRUD operations, and a responsive UI.

## 🚀 Features

### Frontend
- ✅ Built with **React.js** and **TailwindCSS**
- ✅ Responsive design for all screen sizes
- ✅ Protected routes with JWT authentication
- ✅ Client-side form validation
- ✅ Real-time search and filter functionality
- ✅ Redux state management
- ✅ User profile display
- ✅ Task CRUD operations

### Backend
- ✅ RESTful API built with **Node.js** and **Express**
- ✅ **MongoDB** database integration
- ✅ JWT-based authentication
- ✅ Password hashing with **bcrypt**
- ✅ Protected API routes with middleware
- ✅ Comprehensive error handling
- ✅ Server-side validation

### Security
- ✅ Password hashing (bcrypt with 10 salt rounds)
- ✅ JWT token authentication
- ✅ Protected routes on frontend and backend
- ✅ Input validation and sanitization
- ✅ Secure HTTP-only authentication flow

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd primetrade-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskdb?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

**Important:** Replace `<username>`, `<password>`, and the MongoDB URI with your actual credentials.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Option 1: Run both frontend and backend together (from root directory)**

```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 📁 Project Structure

```
primetrade-assignment/
├── backend/
│   ├── config/
│   │   └── dbconnect.js          # MongoDB connection
│   ├── controllers/
│   │   ├── auth.js               # Authentication logic
│   │   └── Task.js               # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── Task.js               # Task routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Task.jsx          # Task card component
│   │   │   ├── FormModal.jsx     # Create/Edit task modal
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── Dashboard.jsx     # Main dashboard
│   │   ├── store/
│   │   │   ├── store.js          # Redux store
│   │   │   └── taskSlice.js      # Task state management
│   │   ├── App.js                # Main app component
│   │   └── index.js              # Entry point
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   └── package.json
└── package.json                   # Root package.json
```

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks/get-all` | Get all user tasks | Yes |
| POST | `/api/tasks/create` | Create new task | Yes |
| PUT | `/api/tasks/update/:id` | Update task | Yes |
| PUT | `/api/tasks/statusUpdate/:id` | Update task status | Yes |
| DELETE | `/api/tasks/delete/:id` | Delete task | Yes |

**Create Task Request:**
```json
{
  "title": "Complete assignment",
  "description": "Finish the frontend developer task"
}
```

**Note:** All task endpoints require `Authorization: Bearer <token>` header.

## 🧪 Testing the Application

### Manual Testing Flow

1. **Register a new account** at `/register`
2. **Login** with your credentials at `/login`
3. **Create tasks** using the "Add Task" button
4. **Search tasks** using the search bar in navbar
5. **Update task status** by clicking the checkbox
6. **Edit tasks** using the edit icon
7. **Delete tasks** using the delete icon
8. **Logout** using the logout button

### Test Credentials (After Registration)

You can create your own test account, or use:
```
Email: test@example.com
Password: test123
```

## 📊 Database Schema

### User Schema
```javascript
{
  name: String (required, min: 2 chars),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min: 6 chars),
  timestamps: true
}
```

### Task Schema
```javascript
{
  userId: ObjectId (ref: User),
  title: String (required),
  description: String (required),
  status: Boolean (default: false),
  timestamps: true
}
```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_jwt_secret_key
```

**Security Note:** Never commit `.env` file to version control. Use `.env.example` instead.

## 🚀 Scaling for Production

### Frontend Optimization
- Implement code splitting with React.lazy()
- Add service workers for offline support
- Enable production build optimizations
- Use CDN for static assets
- Implement caching strategies

### Backend Optimization
- Add rate limiting middleware
- Implement API caching with Redis
- Use connection pooling for MongoDB
- Add request logging and monitoring
- Implement horizontal scaling with PM2
- Use environment-specific configurations

### Database
- Add database indexes for frequently queried fields
- Implement database connection pooling
- Set up database replication for high availability
- Regular database backups

### Security Enhancements
- Add helmet.js for HTTP headers security
- Implement CORS properly for production
- Add request validation middleware
- Implement refresh token mechanism
- Add rate limiting per user/IP
- Enable HTTPS in production

### Deployment Architecture
```
Load Balancer (Nginx)
    ↓
Multiple Backend Instances (PM2 Cluster)
    ↓
MongoDB Replica Set
```

## 🛡️ Security Best Practices Implemented

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with 1-hour expiration
- ✅ Protected routes on frontend and backend
- ✅ Input validation on client and server
- ✅ MongoDB injection prevention
- ✅ XSS protection with proper input sanitization
- ✅ CORS enabled for frontend-backend communication

## 🐛 Known Issues & Future Improvements

### Future Enhancements
- [ ] Add task categories/tags
- [ ] Implement task priority levels
- [ ] Add due dates and reminders
- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] Task sharing between users
- [ ] Dark/Light theme toggle
- [ ] Export tasks to CSV/PDF

## 📝 License

This project was created as an assignment for PrimeTrade Frontend Developer Internship.

## 👨‍💻 Author

**Your Name**
- GitHub: [@kartikey742](https://github.com/kartikey742)
- Email: kumarkartikey742@gmail.com

## 🙏 Acknowledgments

- Assignment provided by PrimeTrade
- Built as part of Frontend Developer Internship application
- MongoDB Atlas for database hosting
- TailwindCSS for styling framework

---

**Note:** This project demonstrates proficiency in full-stack development, authentication, security practices, and modern web development best practices.
