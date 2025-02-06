require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const authRouter = require("./routes/auth.routes");
const googleAuthRouter = require("./routes/google.routes");
const app = express();
const cors = require("cors");
const pageRoutes = require("./routes/page.routes");

const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "ideatewhereideasflowteamsgrow",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/pages", pageRoutes);
app.use("/api/auth", authRouter);
app.use("/auth", googleAuthRouter);

// dont touch
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
