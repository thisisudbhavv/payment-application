const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SCERET = require("../config");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string,
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Email already taken/ Icorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.status(411).json({
      msg: "Email already taken/ Icorrect inputs",
    });
  }

  const dbUser = await User.create(body);

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SCERET
  );

  res.json({
    msg: "User created",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      msg: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      JWT_SCERET
    );

    res.json({
      token: token,
    });
    return;
  }

  return res.status(411).json({
    msg: "Error occured try again",
  });
});

module.exports = router;
