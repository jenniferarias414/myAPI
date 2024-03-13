import jwt from 'jsonwebtoken';
// require('dotenv').config();
import {config} from 'dotenv';
config();
import {User} from '../models/user.js';
import bcrypt from 'bcrypt';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const SECRET = process.env.SECRET

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username: username } }); 

    if (foundUser) {
      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser.hashedPass
      );
      if (isAuthenticated) {
        const token = createToken(
          foundUser.dataValues.username,
          foundUser.dataValues.id
        );
        // Set expiration time for token (two days)
        // const exp = Date.now() + 1000 * 60 * 60 * 48;
        const exp = Date.now() + 1000 * 60 * 2;

        res.status(200).send({
          username: foundUser.dataValues.username,
          userId: foundUser.dataValues.id,
          token: token,
          exp: exp,
        });
      } else {
        // toast.error('Password is incorrect.');
    return res.status(400).send({ error: "Password is incorrect."});
      }
    } else {
        // toast.error('User does not exist.');
      return res.status(400).send({ error: "User does not exist."});
    }
  } catch (err) {
    console.error(err);
    // toast.error('An error occurred while logging in.');
    res.status(400).send(err);
  }
}

export const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        const foundUser = await User.findOne({ where: { username: username } });

        if (foundUser) {
            // toast.error('User with this username already exists.');
            return res.status(400).send({ error: 'User with this username already exists.'})
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await User.create({username: username, hashedPass: hash});

            const token = createToken(newUser.dataValues.username, newUser.dataValues.id);
            // Set expiration time for token (two min)
            const exp = Date.now() + 1000 * 60 * 2;

            res.status(200).send({
                username: newUser.dataValues.username,
                userId: newUser.dataValues.id,
                token: token,
                exp: exp
            });
        }
    } catch (err) {
        console.error(err)
        // toast.error('An error occurred while registering.');
        res.status(400).send(err)
    }
}

const createToken = (username, id) => {
    return jwt.sign({username, id}, SECRET, {expiresIn: '2 minutes'})
}