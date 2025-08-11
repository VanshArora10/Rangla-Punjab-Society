# NGO Website

A modern, responsive NGO website built with React frontend and Node.js backend, featuring donation management, contact forms, and comprehensive information about the organization.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Donation System**: Secure donation processing and management
- **Contact Management**: Contact form with admin dashboard
- **Focus Areas**: Detailed information about NGO initiatives
- **Key Partners**: Showcase of organizational partnerships
- **Admin Dashboard**: Backend management for donations and contacts

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
│   │   ├── component/      # Reusable components
│   │   ├── layout/         # Layout components
│   │   ├── pages/          # Page components
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

### Render Deployment

This project includes a `render.yaml` configuration for easy deployment on Render:

1. **Connect your GitHub repository to Render**
2. **Use the render.yaml file** for automatic service creation
3. **Set environment variables** in Render dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT tokens
   - `FRONTEND_URL`: Your frontend domain

### Manual Deployment

#### Backend
- Deploy to any Node.js hosting service
- Set environment variables
- Ensure MongoDB is accessible

#### Frontend
- Build: `npm run build`
- Deploy `dist/` folder to any static hosting service

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