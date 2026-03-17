const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from respective directories
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname)));

// Catch-all: serve index.html for any other requests (SPA style)
app.use((req, res) => {
    // Prevent catch-all from returning index.html for missing static files
    if (req.path.includes('.') && !req.path.endsWith('.html')) {
        return res.status(404).send('Not Found');
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
