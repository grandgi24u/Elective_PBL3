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
const mongoose = require('mongoose');
const User = require('../Models/User.model');
module.exports = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = yield User.find({});
            res.send(results);
        }
        catch (error) {
            console.log(error.message);
        }
    }),
    createNewUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = new User(req.body);
            const result = yield user.save();
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
        }
    }),
    findUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const user = yield User.findById(id);
            if (!user) {
                throw createError(404, 'L utilisateur n existe pas');
            }
            res.send(user);
        }
        catch (error) {
            console.log(error.message);
        }
    }),
    updateAnUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };
            const result = yield User.findByIdAndUpdate(id, updates, options);
            if (!result) {
                throw createError(404, 'L utilisateur n existe pas');
            }
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
        }
    }),
    deleteAnUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const result = yield User.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'L utilisateur n existe pas');
            }
            res.send(result);
        }
        catch (error) {
            console.log(error.message);
        }
    })
};
