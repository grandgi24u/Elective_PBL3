"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const User_model_1 = __importDefault(require("../Models/User.model"));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
module.exports = {
    auth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, password } = req.body;
        try {
            const user = yield User_model_1.default.findById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }
            else {
                bcrypt.compare(password, user.password).then(function (result) {
                    if (result) {
                        delete user._doc.password;
                        const expireIn = 24 * 60 * 60;
                        const token = jwt.sign({
                            user: user
                        }, SECRET_KEY, {
                            expiresIn: expireIn
                        });
                        res.header('Authorization', 'Bearer ' + token);
                        res.status(200).json({
                            message: "Login successful",
                            user,
                        });
                    }
                    else {
                        res.status(400).json({ message: "Login not succesful" });
                    }
                });
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = yield User_model_1.default.find({});
            res.send(results);
        }
        catch (error) {
            res.status('501').json(error);
        }
    }),
    createNewUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        bcrypt.hash(req.body.password, 10).then((hash) => __awaiter(void 0, void 0, void 0, function* () {
            yield User_model_1.default.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            }).then((user) => res.status(200).json({
                message: "User successfully created",
                user,
            })).catch((error) => res.status(400).json({
                message: "User not successful created",
                error: error.message,
            }));
        }));
    }),
    findUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const user = yield User_model_1.default.findById(id);
            if (!user) {
                res.status('404').json("Utilisateur inconnu");
            }
            res.send(user);
        }
        catch (error) {
            res.status('501').json(error);
        }
    }),
    updateAnUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };
            const result = yield User_model_1.default.findByIdAndUpdate(id, updates, options);
            if (!result) {
                res.status('404').json("Utilisateur inconnu");
            }
            res.send(result);
        }
        catch (error) {
            res.status('501').json(error);
        }
    }),
    deleteAnUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const result = yield User_model_1.default.findByIdAndDelete(id);
            if (!result) {
                res.status('404').json("Utilisateur inconnu");
            }
            res.send(result);
        }
        catch (error) {
            res.status('501').json(error);
        }
    }),
};
