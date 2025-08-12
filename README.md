# NGO Website

A modern, responsive NGO website built with React frontend and Node.js backend, featuring donation management, contact forms, and comprehensive information about the organization.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Donation System**: Secure donation processing and management
- **Contact Management**: Contact form with admin dashboard
- **Focus Areas**: Detailed information about NGO initiatives
- **Key Partners**: Showcase of organizational partnerships
- **Admin Dashboard**: Backend management for donations and contacts
- **Toast Notifications**: Smooth, modern toast notifications for user feedback
- **Improved Error Handling**: Detailed, user-friendly error messages
- **Production-Ready**: Single-server deployment with automatic frontend serving
- **React Router Support**: Server handles client-side routing seamlessly

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Joi** - Data validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## 📁 Project Structure

```
NGO/
├── Backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   └── Server.js           # Main server file
├── Frontend/               # React frontend application
│   ├── src/
│   │   ├── component/      # Reusable components (Toast, etc.)
│   │   ├── context/        # React contexts (ToastContext)
│   │   ├── layout/         # Layout components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions (api.js)
│   │   └── assets/         # Images and static files
│   └── index.html          # Entry point
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- MongoDB database

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NGO
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp env.example .env
   # Edit .env with your MongoDB URI and other configs
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🌐 Deployment

### ⚠️ Important: Fix for Render Deployment

If you're getting errors like "ENOENT: no such file or directory, stat '/opt/render/project/src/Frontend/dist/index.html'" on Render, it means the frontend wasn't built during deployment. 

**Solution:** Use the `render.yaml` file provided in this repository, or manually set the build command to include frontend building.

### Production Deployment (Recommended)

The application is now configured to serve both frontend and backend from a single server, making deployment much simpler:

1. **Build the frontend**:
   ```bash
   cd Frontend
   npm run build
   ```

2. **Deploy the entire project** to your hosting service (Render, Heroku, Railway, etc.)

3. **Set environment variables**:
   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to "production"
   - `PORT`: Your hosting service will provide this

4. **Start the server**:
   ```bash
   cd Backend
   npm start
   ```

The server will automatically serve the React frontend from the `Frontend/dist/` directory and handle all API requests.

### Render Deployment

This project includes a `render.yaml` file for easy deployment:

1. **Connect your GitHub repository to Render**
2. **Use the render.yaml file** for automatic service creation
3. **Set environment variables** in Render dashboard:
   - `MONGO_URI`: Your MongoDB connection string (required)
   - `NODE_ENV`: production (automatically set)
   - `PORT`: 10000 (automatically set)

**Alternative Manual Setup:**
- **Build Command**: `cd Frontend && npm install && npm run build && cd ../Backend && npm install`
- **Start Command**: `cd Backend && npm start`

### Development vs Production

- **Development**: Frontend runs on `localhost:5173`, Backend on `localhost:5000`
- **Production**: Both frontend and backend served from the same domain
- **API Calls**: Automatically handled by the `api.js` utility
- **React Router**: Handled by the server serving `index.html` for all non-API routes

## 📚 API Endpoints

### Donations
- `POST /api/donations` - Create donation
- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get specific donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation
- `GET /api/donations/stats/overview` - Get donation statistics

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts
- `GET /api/contact/:id` - Get specific contact
- `PUT /api/contact/:id` - Update contact
- `DELETE /api/contact/:id` - Delete contact
- `GET /api/contact/stats/overview` - Get contact statistics

## 🔧 Environment Variables

Create a `.env` file in the Backend directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ngo_database
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for NGO organizations** 