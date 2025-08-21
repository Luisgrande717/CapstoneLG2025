# Developer Documentation

## Our Lady of Fatima Parish Website - Developer Guide

### Overview

This is a modern MERN stack application built for Our Lady of Fatima Catholic Parish. The application provides a bilingual (English/Spanish) community platform with spiritual content, event management, and parish services.

### Architecture

```
├── frontend/          # React.js client application
├── backend/           # Express.js API server
├── README.md          # User documentation
└── DEVELOPER.md       # This file
```

## Technology Stack

### Frontend (React 19 + Vite)
- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Context API**: State management for language switching
- **CSS Modules**: Scoped component styling
- **ESLint + Prettier**: Code quality and formatting

### Backend (Node.js + Express)
- **Express.js 5**: Modern web framework
- **MongoDB + Mongoose**: Database and ODM
- **Axios + Cheerio**: Web scraping for daily readings
- **CORS**: Cross-origin resource sharing
- **ESLint + Prettier**: Code quality and formatting

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Capstone2025
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend - Create .env file
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and other config
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend (runs on port 8080)
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend (runs on port 5173)
   cd frontend
   npm run dev
   ```

## Development Workflow

### Code Quality

We use ESLint and Prettier to maintain code quality:

```bash
# Frontend
npm run lint          # Check for linting errors
npm run lint:fix       # Auto-fix linting errors
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting

# Backend
npm run lint          # Check for linting errors
npm run lint:fix       # Auto-fix linting errors
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
```

### Git Workflow

1. Create feature branches from `main`
2. Make atomic commits with descriptive messages
3. Run linting and formatting before committing
4. Create pull requests for code review

```bash
git checkout -b feature/your-feature-name
# Make changes
npm run lint:fix && npm run format
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

## Project Structure

### Frontend Structure

```
frontend/
├── public/
│   └── assets/          # Static images and icons
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorFallback.jsx
│   ├── context/         # React Context providers
│   │   └── LanguageContext.jsx
│   ├── data/            # Static data and translations
│   │   └── translations.jsx
│   ├── pages/           # Page components
│   │   ├── Homepage.jsx
│   │   ├── Mass.jsx
│   │   ├── Events.jsx
│   │   └── ...
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Application entry point
├── eslint.config.js     # ESLint configuration
├── .prettierrc          # Prettier configuration
├── vite.config.js       # Vite configuration
└── package.json
```

### Backend Structure

```
backend/
├── config/
│   └── db.js            # MongoDB connection
├── controllers/         # Business logic (future)
├── models/             # Mongoose schemas
│   └── Event.js
├── routes/             # API route handlers
│   ├── readings.js     # Scripture scraping endpoints
│   └── events.js       # Event management endpoints
├── middleware/         # Custom middleware (future)
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── index.js            # Server entry point
└── package.json
```

## Key Features

### 1. Bilingual Support

The application supports English and Spanish with persistent language preferences:

```javascript
// Using the translation hook
const { language, toggleLanguage, t } = useLanguage();

// Translate text
const welcomeText = t('nav.home', { fallback: 'Home' });
```

### 2. Daily Scripture Readings

Automated web scraping from USCCB (United States Conference of Catholic Bishops):

```javascript
// API endpoint: GET /api/readings/today
{
  "success": true,
  "title": "Daily Reading",
  "excerpt": "Full scripture text...",
  "preview": "First 150 characters...",
  "date": "Wed Jan 15 2025",
  "link": "https://bible.usccb.org/daily-bible-reading"
}
```

### 3. Event Management

MongoDB-based event storage with CRUD operations:

```javascript
// Event model structure
{
  title: String,
  description: String,
  date: Date,
  location: String,
  category: String
}
```

### 4. Responsive Design

Mobile-first CSS with modern practices:
- CSS Grid and Flexbox layouts
- Custom CSS properties for theming
- Accessible color contrasts
- Smooth animations and transitions

## API Documentation

### Base URL
- Development: `http://localhost:8080`
- Production: TBD

### Endpoints

#### Health Check
```http
GET /health
```
Response:
```json
{
  "status": "OK",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "2.0.0"
}
```

#### Daily Readings
```http
GET /api/readings/today
```
Response:
```json
{
  "success": true,
  "title": "Gospel Reading",
  "excerpt": "Full scripture text...",
  "preview": "Preview text...",
  "date": "Wed Jan 15 2025",
  "link": "https://bible.usccb.org/daily-bible-reading",
  "source": "USCCB"
}
```

#### Events
```http
GET /api/events
POST /api/events
PUT /api/events/:id
DELETE /api/events/:id
```

## Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:

```bash
npm run build    # Creates dist/ folder
```

Popular options:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Backend Deployment

The backend can be deployed to any Node.js hosting service:

Popular options:
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Railway

### Environment Variables

Backend `.env` configuration:
```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## Testing Strategy

### Frontend Testing (Future Implementation)
- **Unit Tests**: Vitest + React Testing Library
- **Component Tests**: Test individual components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Playwright for full user flows

### Backend Testing (Future Implementation)
- **Unit Tests**: Jest for individual functions
- **Integration Tests**: Test API endpoints
- **Database Tests**: Test MongoDB operations

## Performance Considerations

### Frontend Optimizations
- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Service Worker for offline functionality

### Backend Optimizations
- **Database Indexing**: Optimize MongoDB queries
- **Caching**: Redis for frequently accessed data
- **Rate Limiting**: Prevent API abuse
- **Compression**: Gzip response compression

## Security Best Practices

### Frontend Security
- **Content Security Policy**: Prevent XSS attacks
- **Input Validation**: Sanitize user inputs
- **HTTPS Only**: Force secure connections
- **Environment Variables**: Keep secrets out of bundle

### Backend Security
- **Helmet.js**: Security headers
- **CORS Configuration**: Restrict allowed origins
- **Input Validation**: Validate all API inputs
- **Authentication**: JWT-based auth (future)
- **Rate Limiting**: Prevent brute force attacks

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check backend CORS configuration
   - Verify frontend URL in allowed origins

2. **MongoDB Connection Issues**
   - Verify MONGODB_URI in .env
   - Check network access in MongoDB Atlas

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

4. **Scripture Scraping Failures**
   - USCCB website changes may break selectors
   - Check error logs for specific issues
   - Fallback content is automatically served

### Debug Mode

Enable debug logging:
```env
DEBUG=app:*
NODE_ENV=development
```

## Contributing

### Code Standards
- Follow ESLint and Prettier configurations
- Write descriptive commit messages
- Add JSDoc comments for functions
- Test changes thoroughly

### Pull Request Process
1. Create feature branch
2. Make changes with tests
3. Run linting and formatting
4. Submit PR with description
5. Address review feedback

## Support

For technical issues or questions:
- Create GitHub issues for bugs
- Use discussions for questions
- Check existing documentation first

## License

ISC License - See LICENSE file for details.