const mongoose = require('mongoose');
const User = require('../Models/User.model');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const results = await User.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewUser: async (req, res) => {
    try {
      const user = new User(req.body);
      const result = await user.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  findUserById: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        throw createError(404, 'L utilisateur n existe pas');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
    }
  },

  updateAnUser: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'L utilisateur n existe pas');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteAnUser: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'L utilisateur n existe pas');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  }
};