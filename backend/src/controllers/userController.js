const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const { validateEmail } = require("../helpers/validation");

const signup = async (req, res) => {
  let { name, email, town, district, state, password } = req.body;
  try {
    //encrypt the password
    password = await bcrypt.hash(password, 10);
    const user = await User({
      name,
      email,
      town,
      district,
      state,
      password,
    });
    if (!validateEmail(email)) {
      throw new Error("Invalid email address");
    }

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `http://localhost:7000/activate/${emailVerificationToken}`;
    await sendVerificationEmail(user.email, user.name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    await user.save();

    //display the user details
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find the user with the perticular email if exist
    let user = await User.findOne({ email });

    //check wheather the password is matching or not
    const isMatch = await bcrypt.compare(password, user.password);

    console.log(user.verified);
    if (isMatch && user.verified) {
      const token = generateToken({ id: user._id.toString() }, "7d");

      //display the user details
      res.status(200).json({ user, token });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports = { login, signup };
