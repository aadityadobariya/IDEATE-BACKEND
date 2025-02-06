const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../services/passport.service.js");

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res
        .status(422)
        .json({ error: "Username, E-mail, and password are required fields." });
    }

    if (await prisma.user.findUnique({ where: { email } })) {
      return res.status(409).json({ error: "E-mail already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: "User doesn't exist." });

    const id = { id: user.id };
    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);

    const verify = await bcrypt.compare(password, user.password);
    if (verify) {
      res.status(200).json({
        id: user.id,
        name: user.username,
        email: user.email,
        accessToken,
        refreshToken,
      });
    } else {
      return res.status(400).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const newToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.send("Please provide a token");

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);

    if (!decoded)
      return res.status(400).json({ message: "Something went wrong." });

    const id = { id: decoded.id };

    const accessToken = generateAccessToken(id);

    res.status(200).json({
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

generateAccessToken = (id) => {
  return jwt.sign(id, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1d" });
};

generateRefreshToken = (id) => {
  return jwt.sign(id, process.env.JWT_REFRESH_TOKEN, { expiresIn: "7d" });
};

const googleAuth = async (req, res) => {
  res.redirect("http://localhost:5173/");
};

module.exports = {
  registerUser,
  login,
  newToken,
  googleAuth,
};
