import express from 'express';
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route de base retourne le status ok 
app.get("/", (req, res) => {
  res.status(200).json({message: "ok"});
});

const UserRoute = require('./routes/User.route');
app.use('/users', UserRoute);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
  return console.log(`Application lancée sur le port ${process.env.PORT}`);
}); 