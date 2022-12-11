"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require('dotenv');
dotenv.config();
const app = (0, express_1.default)();
app.listen(process.env.PORT, () => {
    return console.log(`Application lancée sur le port ${process.env.PORT}`);
});
