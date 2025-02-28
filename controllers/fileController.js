const { Console } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
const uploadDir = 'D:/home/Images'; // Directory where files are stored
Console.log("uploadDir"+uploadDir);
// Endpoint to upload files
exports.uploadFiles = async (req, res) => {
  const { files } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No files to upload' });
  }

  try {
    const fileResults = await Promise.all(
      files.map(async (file) => {
        if (!file.base64 || !file.name || !file.appNo) {
          throw new Error('Invalid file data: Missing base64, name, or appNo');
        }
console.log("file.base64"+file.base64);
        const fileBuffer = Buffer.from(file.base64, 'base64');
        const fileName = `${file.appNo}_${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        console.log("file.base64 filePath"+filePath);
        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Write the file buffer to the specified path
        await fs.promises.writeFile(filePath, fileBuffer);
        return { appNo: file.appNo, fileName };
      })
    );

    res.status(200).json({
      message: 'Files uploaded successfully',
      appNo: files[0].appNo,
      files: fileResults,
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ message: 'Error uploading files: ' + error.message });
  }
};

// Retrieve files by application number and filename
// Retrieve files by application number and filename

// Retrieve files by application number and filename
exports.getFilesByAppId = async (req, res) => {
  try {
    const { appNo } = req.params;  // Get appNo from URL params
    const { filename } = req.query;  // Get filename from query params

    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' });
    }

    const filePath = path.join(uploadDir, `${appNo}_${filename}`);  // Construct the file path

    console.log('File path:', filePath);  // Log the file path for debugging

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      console.log('File found, sending file...');
      res.sendFile(filePath);  // Send the file if it exists
    } else {
      console.log('File not found:', filePath);  // Log file not found
      return res.status(404).json({ message: 'File not found' });
    }
  } catch (err) {
    console.error('Error fetching file:', err);
    res.status(500).json({ message: 'Error fetching file' });
  }
};
// Generate application number
exports.generateAppNo = (req, res) => {
  const appNo = `APP-${Date.now()}`; // Generate a unique application number based on the current timestamp
  res.json({ appNo });
};
