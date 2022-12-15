"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// route de base retourne le status ok 
app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));
const UserRoute = require('./routes/User.route');
app.use('/users', UserRoute);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);
app.listen(process.env.PORT, () => {
    return console.log(`Application lancée sur le port ${process.env.PORT}`);
});
