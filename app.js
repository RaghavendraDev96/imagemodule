const express = require('express');
const path = require('path');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes'); // Adjust path if needed

const app = express();
const port = 3000;

// Enable CORS for all origins (adjust as necessary for security)
app.use(cors());

// Middleware to parse JSON bodies and handle larger payloads (up to 10mb)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS, JS, and images from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve files (images, PDFs, etc.) from the 'D:/home/Images' folder
const uploadDir = 'D:/home/Images'; // Directory where files are stored
app.use('/files/uploads', express.static(uploadDir));

// Use the file routes
app.use('/files', fileRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
