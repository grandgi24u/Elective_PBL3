// @ts-ignore
import User from '../Models/User.model';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  auth: async (req, res) => {
    const { id, password } = req.body;
    try {
      const user = await User.findById(id)
      if (!user) {
        res.status(404).json({message: "User not found"});
      } else {
        bcrypt.compare(password, user.password).then(function (result) {
          if(result) {
            delete user._doc.password;
            const expireIn = 24 * 60 * 60;
            const token    = jwt.sign({
                  user: user
                },
                SECRET_KEY,
                {
                  expiresIn: expireIn
                });
            res.header('Authorization', 'Bearer ' + token);
            res.status(200).json({
              message: "Login successful",
              user,
            })
          } else {
            res.status(400).json({message: "Login not succesful"});
          }
        });
      }
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const results = await User.find({});
      res.send(results);
    } catch (error) {
      res.status('501').json(error);
    }
  },

  createNewUser: async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        }).then((user) =>
            res.status(200).json({
              message: "User successfully created",
              user,
            })
        ).catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
        );
    });
  },

  findUserById: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status('404').json("Utilisateur inconnu");
      }
      res.send(user);
    } catch (error) {
      res.status('501').json(error);
    }
  },

  updateAnUser: async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        res.status('404').json("Utilisateur inconnu");
      }
      res.send(result);
    } catch (error) {
      res.status('501').json(error);
    }
  },

  deleteAnUser: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        res.status('404').json("Utilisateur inconnu");
      }
      res.send(result);
    } catch (error) {
      res.status('501').json(error);
    }
  },

  deleteAll: async (req, res) => {
    try {
      const result = await User.deleteMany({});
      res.send(result);
    } catch (error) {
      res.status('501').json(error);
    }
  },
};