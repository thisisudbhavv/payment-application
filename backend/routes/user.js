const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SCERET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
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
      msg: "Email already taken/ Incorrect inputs",
    });
  }

  const dbUser = await User.create(body);

  const userId = dbUser._id;

  //new account
  await Account.create({
    userId,
    balance: 0,
  });

  const token = jwt.sign(
    {
      userId: userId,
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

router.put("/update", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    res.status(411).json({
      msg: "Error occured while updating",
    });
  }

  //check for this later if error
  await User.updateOne({ _id: body.userId }, body);

  res.status(200).json({
    msg: "Updated Successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  const userId = req.userId;
  const userIndex = users.findIndex((user) => user._id == userId);
  if (userIndex !== -1) {
    const [me] = users.splice(userIndex, 1);
  }

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const account = await User.findOne({
    _id: userId,
  });

  res.status(200).json({
    account,
  });
});

module.exports = router;
