  const http = require('http');
  const mongoose = require('mongoose');
  const url = require('url');
  const handleExchangeRoutes = require('./routes/exchange');
  const handleUserRoutes = require('./routes/user');
  const handleCommentRoutes = require('./routes/comment');
  // Kết nối MongoDB
  mongoose.connect('mongodb://localhost:27017/Users', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

  // Tạo server HTTP
  const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const path = parsedUrl.pathname;

      res.setHeader('Content-Type', 'text/plain');

      if (path === '/') {
          res.end('Home page\n');
      } else if (path === '/about') {
          res.end('About page\n');
      } else if (path === '/contact') {
          res.end('Contact page\n');
      } else if (path === '/abc') {
        res.end('Trang không tồn tại\n');
      } else if (path === '/convert') {
        handleExchangeRoutes(req, res, parsedUrl);
      } else if (path === '/users') {
        handleUserRoutes(req, res, parsedUrl);
      } else {
        handleCommentRoutes(req, res, parsedUrl);
      }
  });

  // Lắng nghe trên cổng 8088
  server.listen(8088, () => {
      console.log('Server is running at http://localhost:8088');
  });