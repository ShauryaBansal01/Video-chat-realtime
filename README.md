# Streamify 🌍💬

A modern language learning social platform that connects language learners worldwide through real-time chat and community features.

## 🚀 Features

- **User Authentication**: Secure signup, login, and logout functionality
- **User Onboarding**: Comprehensive profile setup with language preferences
- **Language Learning Focus**: Connect with native speakers and fellow learners
- **Real-time Chat**: Powered by Stream Chat for seamless communication
- **Profile Management**: Customizable profiles with bio, location, and language preferences
- **Friend System**: Connect with other language learners
- **Secure**: JWT-based authentication with encrypted passwords

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Stream Chat** for real-time messaging
- **bcryptjs** for password encryption
- **Cookie-parser** for session management

### Frontend
- **React 19** with Vite
- **Modern JavaScript (ES6+)**
- **CSS3** for styling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Stream Chat account (for API keys)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd streamify
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/login` | Login user | No |
| POST | `/logout` | Logout user | No |
| POST | `/onboarding` | Complete user profile setup | Yes |
| GET | `/me` | Get current user info | Yes |

### Request/Response Examples

#### Signup
```json
POST /api/auth/signup
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Onboarding
```json
POST /api/auth/onboarding
{
  "fullName": "John Doe",
  "bio": "Language enthusiast learning Spanish",
  "nativeLanguage": "English",
  "learningLanguage": "Spanish",
  "location": "New York, USA"
}
```

## 🗄️ Database Schema

### User Model
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  password: String (required, min: 6 chars),
  bio: String,
  profilePic: String (auto-generated avatar),
  nativeLanguage: String,
  learningLanguage: String,
  location: String,
  isOnBoarded: Boolean (default: false),
  friends: [ObjectId] (references to other users),
  timestamps: true
}
```

## 🔐 Security Features

- **Password Encryption**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Tokens stored in secure HTTP-only cookies
- **Input Validation**: Server-side validation for all user inputs
- **CORS Protection**: Configured for secure cross-origin requests

## 🌟 Key Features Explained

### User Onboarding Flow
1. User signs up with basic information
2. System generates a random avatar
3. User completes onboarding with language preferences
4. Profile is marked as onboarded and synced with Stream Chat

### Stream Chat Integration
- Users are automatically created/updated in Stream Chat
- Enables real-time messaging capabilities
- Supports user presence and typing indicators

### Authentication Middleware
- Protects routes that require authentication
- Validates JWT tokens from cookies
- Attaches user information to request object

## 📁 Project Structure

```
streamify/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── auth.route.js
│   │   ├── lib/
│   │   │   ├── db.js
│   │   │   └── stream.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🚧 Development Status

This project is currently in active development. The following features are implemented:

✅ User authentication system
✅ User registration and login
✅ Profile onboarding
✅ Stream Chat integration
✅ JWT-based security
✅ MongoDB integration

### Upcoming Features
- [ ] Real-time chat interface
- [ ] Friend system implementation
- [ ] Language matching algorithm
- [ ] Group chat rooms by language
- [ ] User search and discovery
- [ ] Mobile responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Environment Variables

Make sure to set up the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET_KEY` | Secret key for JWT tokens | Yes |
| `STREAM_API_KEY` | Stream Chat API key | Yes |
| `STREAM_API_SECRET` | Stream Chat API secret | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [Stream Chat](https://getstream.io/) for real-time messaging capabilities
- [MongoDB](https://www.mongodb.com/) for database solutions
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework

---

**Happy Language Learning! 🌍📚**