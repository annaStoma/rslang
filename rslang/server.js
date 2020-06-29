const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const routes = [
  '/',
  '/login',
  '/register',
  '/setting',
  '/statistic',
  '/promo',
  '/about-us',
  '/speakit',
  '/savannah',
  '/audiocall',
  '/english-puzzle',
  '/sprint',
  '/own-game'
];


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('dist/rslang'));

app.get('*', (req, res) => {
  if (!routes.some(route => {
    const set = new Set(req.url.split(/\?/));
    return set.has(route);
  })) {
    res.status(404);
  }
  res.sendFile(path.join(__dirname, '/dist/rslang/index.html'));
});

app.listen(PORT, () => {
  console.log(`Node.js web server at port ${PORT} is running...`);
});
