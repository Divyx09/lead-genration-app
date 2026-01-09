# Real Estate Lead Generation Website

Hey! This is my full-stack lead generation website project for real estate businesses. Built it from scratch using MERN stack (MongoDB, Express, React, Node.js).

## What This Project Does

This is a complete website where real estate companies can showcase their projects and collect leads from potential clients. It has a public-facing landing page and a separate admin panel to manage everything.

## Tech Stack I Used

**Frontend:**
- React.js with Vite - chose Vite because it's much faster than create-react-app
- Tailwind CSS - honestly made styling so much easier
- React Router - for navigation between pages
- Axios - to handle all the API calls
- React Hook Form - form validation made simple
- React Toastify - for those nice notification popups
- React Easy Crop - spent quite some time implementing the image cropping feature

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose - first time working with MongoDB, learned a lot!
- JWT for authentication
- Bcrypt for password hashing
- Multer - for handling image uploads
- Json2csv - to export subscriber data

## Main Features

### Landing Page (Public)
1. **Hero Section** - has an appointment form where visitors can submit their details
2. **About Us** - company information
3. **Services** - shows what services are offered
4. **Projects** - displays featured projects (fetched from database)
5. **Testimonials** - client reviews carousel that shows 5 at a time
6. **Footer** - with newsletter subscription

### Admin Panel (Protected)
1. **Projects Management**
   - Add/Edit/Delete projects
   - Upload project images with cropping option
   - All CRUD operations working
   
2. **Clients/Testimonials Management**
   - Manage client testimonials
   - Upload client photos (circular display)
   - Add their designation and review text

3. **Contacts Viewer**
   - See all form submissions from the landing page
   - View name, email, phone, city and date
   - Delete feature included

4. **Subscribers Management**
   - List all newsletter subscribers
   - Export to CSV functionality

## How I Built This

### Setting Up The Project
Started by creating two folders - one for frontend and one for backend. Initialized them separately.

### Database Design
Created 4 main models:
- **Lead Model** - stores contact form submissions (name, email, phone, city)
- **Project Model** - stores project details with images
- **Client Model** - for testimonials (name, designation, image, review)
- **Subscriber Model** - newsletter emails
- **Admin Model** - for admin authentication

### Frontend Development
1. First built all the landing page components one by one
2. Made sure to match the design requirements 
3. Connected each section with the backend API
4. Then worked on the admin panel
5. Implemented protected routes so only logged-in admins can access

### Backend Development
1. Set up Express server with all necessary middleware
2. Created RESTful APIs for all operations
3. Added authentication using JWT tokens
4. Implemented file upload handling with Multer
5. Set up static file serving for uploaded images

### Image Upload Feature
This was tricky! Initially was just storing image URLs, but then implemented proper file uploads:
- Used Multer to handle multipart form data
- Created upload endpoints for projects and clients separately
- Integrated react-easy-crop for the cropping functionality
- Images are stored in `/backend/uploads` folder
- Used canvas API to actually crop the images before uploading

## Challenges I Faced

1. **Image Paths Issue** - Spent time figuring out why images weren't showing up. Turns out I needed to configure static file serving properly and had to handle the API URL differently for images.

2. **Module System** - Had some confusion with CommonJS vs ES Modules. Learned that I should stick to one throughout the project (used ES modules).

3. **Form Validation** - The phone field validation was giving errors initially. Fixed it by properly handling the data being sent from frontend.

4. **Cropping Feature** - The image cropping took the most time to implement. Had to understand how canvas works and how to convert blobs to files.

5. **Database Seeding** - When seeding initial data, had to make sure the image paths matched where images were actually stored.

## What I Learned

- How to structure a full-stack application properly
- Working with MongoDB and Mongoose schemas
- JWT authentication implementation
- File handling and image manipulation
- React hooks and state management
- How to handle forms in React
- Deploying and serving static files
- API design and REST principles

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd lead-generation-app
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create .env file in backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. Create .env file in frontend folder:
```
VITE_API_URL=http://localhost:5000/api
```

6. Run the backend server
```bash
cd backend
npm run dev
```

7. Run the frontend (in new terminal)
```bash
cd frontend
npm run dev
```

### Default Admin Credentials
```
Email: admin@realestate.com
Password: admin123
```

## Project Structure

```
lead-generation-app/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware (auth, upload)
│   ├── uploads/         # Uploaded images stored here
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── admin/   # Admin panel components
    │   │   └── landing/ # Landing page components
    │   ├── pages/       # Page components
    │   └── App.jsx      # Main app component
    └── public/
```

## API Endpoints

### Public Routes
- `POST /api/leads` - Submit contact form
- `POST /api/subscribers` - Newsletter subscription
- `GET /api/projects` - Get all projects
- `GET /api/clients` - Get all testimonials

### Protected Routes (Require JWT)
- `GET /api/admin/leads` - Get all leads
- `DELETE /api/admin/leads/:id` - Delete a lead
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- Similar CRUD routes for clients and subscribers

## Screenshots

(Would add screenshots here but haven't taken them yet)

## Future Improvements

Things I'd like to add if I get more time:
- Email notifications when new leads come in
- Dashboard with analytics and charts
- Search and filter in admin panel
- Pagination for large datasets
- Image compression before upload
- Cloud storage integration (currently using local storage)
- More detailed project pages
- Contact form with more fields

## Contributing

Feel free to fork this project and make improvements!

## Issues

If you find any bugs or issues, please let me know.

---

**Note:** This is a learning project I built to understand full-stack development better. Any suggestions or feedback are welcome!


Built with  using MERN Stack

---

## Developer

**Divya Attarde**

-  Portfolio: [divyaattarde.me](https://divyaattarde.me)
-  Email: divyaattarde94@gmail.com
-  Phone: 8827409899
-  GitHub: [@Divyx09](https://github.com/Divyx09)
