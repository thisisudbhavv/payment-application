const express = require("express");
const Account = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({
    userId: userId,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Insufficient Balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!account) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account",
    });
  }

  //Transaction
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount, //deduct
      },
    }
  ).session(session);
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount, //credit
      },
    }
  ).session(session);

  await session.commitTransaction();
  res.json({
    msg: "Transfer Successful",
  });
});

module.exports = router;
