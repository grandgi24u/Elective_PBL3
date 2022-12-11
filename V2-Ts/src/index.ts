import express from 'express';
const dotenv = require('dotenv');
dotenv.config()

const app = express();

app.listen(process.env.PORT, () => {
  return console.log(`Application lancée sur le port ${process.env.PORT}`);
}); 