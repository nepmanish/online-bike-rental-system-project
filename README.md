# 🚴 Bike Rental System

A comprehensive online bike rental platform built with React (Vite) frontend and Node.js backend, featuring personalized bike recommendations using machine learning clustering.

## ✨ Features

### 🔐 User Authentication
- **User Registration & Login**: Secure JWT-based authentication
- **Profile Management**: Update personal information and preferences
- **Role-based Access**: Different interfaces for users and administrators

### 🚴‍♂️ Bike Management
- **Browse Bikes**: Filter bikes by price range, engine CC, and weight
- **Availability Status**: Real-time bike availability tracking
- **Bike Details**: Comprehensive information including specifications and ratings

### 🤖 Smart Recommendations
- **Personalized Suggestions**: AI-powered bike recommendations based on user preferences
- **K-Means Clustering**: Bikes are clustered using machine learning algorithms
- **Preference Settings**: Users can set preferred price range, engine size, and weight

### 📅 Booking System
- **Easy Booking**: Streamlined booking process with pickup/drop locations
- **Date Selection**: Choose booking and return dates
- **Booking Management**: View, cancel, and track booking status
- **Real-time Updates**: Automatic bike availability updates

### 👑 Admin Dashboard
- **Bike Management**: Add, edit, delete bikes and manage specifications
- **User Management**: View and manage user accounts
- **Booking Overview**: Monitor all bookings with status management
- **System Analytics**: View system statistics and performance metrics
- **Clustering Management**: Recluster bikes and view clustering data

## 🛠️ Technology Stack

### Frontend
- **React 19** with **Vite** for fast development
- **Tailwind CSS** for responsive styling
- **React Router** for navigation
- **Axios** for API communication
- **React DatePicker** for date selection
- **React Icons** for UI icons

### Backend
- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **node-kmeans** for bike clustering
- **Morgan** for logging
- **Helmet** for security

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bike-rental-system
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create a `config.env` file in the server directory:
   ```env
   NODE_ENV=development
   DATABASE=mongodb+srv://your-username:<password>@cluster.mongodb.net/bikeRental?retryWrites=true&w=majority
   DATABASE_PASSWORD=your-database-password
   PORT=3000
   JWT_SECRET=your-super-secure-jwt-secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   ```

4. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Initialize the database with sample data**
   ```bash
   cd ../server
   node setup.js --import
   ```

6. **Start the development servers**
   
   **Backend (in server directory):**
   ```bash
   npm start
   ```
   
   **Frontend (in frontend directory):**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 👥 Default Users

After running the setup script, you can login with:

- **Admin User**
  - Email: `admin@bikerental.com`
  - Password: `admin123`

- **Regular User**
  - Email: `user@bikerental.com`
  - Password: `user123`

## 📋 API Endpoints

### Authentication
- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/logout` - User logout
- `GET /api/v1/users/me` - Get current user

### Bikes
- `GET /api/v1/bikes` - Get all bikes
- `GET /api/v1/bikes/:id` - Get specific bike
- `POST /api/v1/bikes` - Create bike (admin only)
- `PATCH /api/v1/bikes/:id` - Update bike (admin only)
- `DELETE /api/v1/bikes/:id` - Delete bike (admin only)

### Bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings` - Get user's bookings
- `PATCH /api/v1/bookings/cancel/:id` - Cancel booking
- `GET /api/v1/bookings/admin/all` - Get all bookings (admin only)

### Recommendations
- `GET /api/v1/users/recommend` - Get personalized recommendations
- `PATCH /api/v1/users/preferences` - Update user preferences

## 🎯 Usage Guide

### For Users
1. **Sign up** for a new account or **login** with existing credentials
2. **Set your preferences** by visiting the Preferences page
3. **Browse bikes** or view **personalized recommendations**
4. **Book a bike** by selecting dates and pickup/drop locations
5. **Manage your bookings** from the My Bookings page

### For Administrators
1. **Login** with admin credentials
2. **Access the Admin Dashboard** from the navigation
3. **Manage bikes** - add, edit, or remove bikes from the fleet
4. **Monitor bookings** - view and update booking statuses
5. **Manage users** - view user information and activity
6. **Analyze system data** - view analytics and clustering information

## 🔧 Advanced Features

### Bike Clustering System
The system uses K-means clustering to group bikes based on:
- Price
- Engine CC (displacement)
- Weight

This enables intelligent recommendations by matching user preferences to bike clusters.

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Input sanitization
- Rate limiting
- Secure HTTP headers with Helmet

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MongoDB is running
   - Check DATABASE_PASSWORD in config.env
   - Verify network connectivity for cloud databases

2. **Frontend Not Loading**
   - Ensure backend is running on port 3000
   - Check console for CORS errors
   - Verify API_URL in frontend/src/services/api.js

3. **Recommendations Not Working**
   - Ensure user has set preferences
   - Check if bikes have been clustered (run setup script)
   - Verify clustering data exists in database

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please create an issue in the repository or contact the development team.

---

**Happy Biking! 🚴‍♂️🚴‍♀️**