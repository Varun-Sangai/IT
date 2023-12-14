const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello world, This is my Node.js server\n');
});

// Use 10000 as the starting point
let PORT = 10000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // Port is already in use, try the next one
    PORT++;
    server.listen(PORT);
  } else {
    console.error(err);
  }
});
