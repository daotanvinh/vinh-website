const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

// Multer storage configuration to handle file uploads.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle avatar uploads.
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // Convert the file buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Save the base64 image into a file in the data directory.
    fs.writeFile(`data/${req.file.originalname}`, base64Image, 'base64', (error) => {
        if (error) {
            return res.status(500).send('Error saving file.');
        }
        return res.status(200).send('File uploaded and saved successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
