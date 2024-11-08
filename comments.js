// Create web server
// Create a route to handle comments
// Read the comments from a file
// Display the comments in the browser
// Add a form to the comments page
// Handle the form submission
// Append the new comment to the file
// Redirect the user back to the comments page

// Load the http module
const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const comments = require('./comments');

// Create a web server
http.createServer((req, res) => {
    if (req.url === '/comments' && req.method === 'GET') {
        // Read the comments from the file
        fs.readFile(path.join(__dirname, 'comments.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            // Display the comments in the browser
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/comments' && req.method === 'POST') {
        let body = '';

        req.on('data', (data) => {
            body += data;
        });

        req.on('end', () => {
            // Parse the body
            let params = qs.parse(body);

            // Append the new comment to the file
            comments.push(params.comment);

            // Redirect the user back to the comments page
            res.writeHead(303, { 'Location': '/comments' });
            res.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:300)');});