"use strict";

const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000;
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Get file extensions
    let extname = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.ico':
            contentType = 'image/x-ico';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { "Content-Type": contentType });
                    res.end(content, 'utf8');
                });
            }
            else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, 'utf8');
        }
    });
});






server.listen(port, () => console.log(`Server is running on port ${port}!`));