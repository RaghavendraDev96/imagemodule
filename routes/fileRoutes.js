const express = require('express');
const fileController = require('../controllers/fileController'); // Adjust path if needed
const router = express.Router();

// Route to fetch application number
router.get('/generate-appno', fileController.generateAppNo);

// Route to upload files
router.post('/upload-base64', fileController.uploadFiles);

    // Route to fetch files by application number
    router.get('/applications/:appNo', fileController.getFilesByAppId);

// Route to get files by appNo
//router.get('/files/applications/:appNo', fileController.getFilesByAppId);

    module.exports = router;
