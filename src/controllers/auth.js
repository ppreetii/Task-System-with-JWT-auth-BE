const bcrypt = require("bcryptjs");

const {RegisterSchema,LoginSchema} = require("../utils/validation-schema/auth");
const User = require("../db/models/user");
const jwt = require("../utils/helper/jwt");
const jwtConfig = require("../db/config/jwt");

exports.getLogin = (req, res, next) => {
  res.status(200).send({
    message: "You are now on Login Page",
  });
};

exports.getSignup = (req, res, next) => {
  res.status(200).send({
    message: "You are now on SignUp Page",
  });
};

exports.postSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await RegisterSchema.validateAsync({
        name, email, password 
    }, {
      abortEarly: false,
    });

    const isExist = await User.findOne({
      where: { email },
    });
    if (isExist)
      return res.status(400).json({ message: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error.isJoi) {
      error = error.details.map((err) => err.message).join(" ; ");
      return res.status(400).json({ ValidationError: error });
    }

    throw new Error(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await LoginSchema.validateAsync(req.body, {
      abortEarly: false
    });

    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (isMatched) {
        const token = jwt.createToken({ id: user.id });
        req.session.token = token;

        return res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          access_token: token,
          token_type: "Bearer",
          expires_in: jwtConfig.expiration
        });
      } else {
        return res.status(400).json({ message: 'Password Incorrect' });
      }
    } else {
      return res.status(400).json({ message: 'Email Not Found' });
    }
    // return res.status(400).json({ message: "Unauthorized" });
  } catch (error) {
    if (error.isJoi) {
      error = error.details.map((err) => err.message).join(" ; ");
      return res.status(400).json({ ValidationError: error });
    }
    
    return res.status(500).send({message: error.message});
  }
};
