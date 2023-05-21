import { LogInInfoI, UserInfoI } from "../../common/interfaces/user-info";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { getSalt } from "../../utils/salt";
import { hashString } from "../../utils/hashString";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  NOT_FOUND,
  PASSWORD_NOT_MATCHED,
} from "../../common/constants/error-responses";
import { RequestI, ResponseI } from "../../common/interfaces/request-objects";
import { InvitedUser } from "../models/request-token";
import { PasswordToken } from "../models/password-token";
import { sendMail } from "../mail-services/mail";

export async function createUser(attributes) {
  const { email, password, fullName } = attributes;
  const user = new User({
    ...attributes,
  });
  await user.save();
  return user;
}
export async function logIn(req: RequestI, res: ResponseI) {
  try {
    const loginCredentials: LogInInfoI = { ...req.body };
    const user = await User.findOne({ email: loginCredentials.email });
    if (!user) return res.status(401).json({ message: INVALID_CREDENTIALS });
    const salt = user.salt;

    const hashedPassword = hashString(loginCredentials.password, salt);

    if (user.password === hashedPassword) {
      const token = jwt.sign(user.id, process.env.SECRET_KEY);
      return res.status(200).json({ "access-token": token });
    } else {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ message: e._message });
  }
}

//signup the user it takes token and password
export async function signUp(req: express.Request, res: express.Response) {
  const receivedToken = req.params.token;
  console.log({ receivedToken });

  try {
    const payload = jwt.verify(receivedToken, process.env.SECRET_KEY);
    const invitedUser = await InvitedUser.findOne({ email: payload["email"] });
    if (!invitedUser) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const email = invitedUser.email;
    const salt: string = bcrypt.genSaltSync(10);
    const hashedPassword: string = await hashString(req.body.password, salt);
    const user = new User({
      password: hashedPassword,
      email: email,
      salt: salt,
      fullName: req.body.fullName,
      isAdmin: false,
    });
    const newUser = await user.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    await InvitedUser.findOneAndDelete({ email: email });

    return res.status(200).json({ "access-token": token });
  } catch (err) {
    console.log("error hai");
    console.log(err);

    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
// function to reset the password of the user
export async function changePassword(req: RequestI, res: ResponseI) {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (user) {
      const oldHashedPassword = hashString(currentPassword, user.salt);
      if (oldHashedPassword !== user.password)
        return res.status(403).json({ message: PASSWORD_NOT_MATCHED });
      await user.updateOne({ password: hashString(newPassword, user.salt) });
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (e) {
    res.status(403).json({ message: PASSWORD_NOT_MATCHED });
  }
}
export async function myProfile(req: RequestI, res: ResponseI) {
  try {
    const token = req.params.token;
    const userId = req.userId;
    // const id = jwt.verify(token, process.env.SECRET_KEY);
    const userProfile = await User.findById(userId, { password: 0, salt: 0 });
    return res.status(200).json(userProfile);
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function forgotPassword(req: RequestI, res: ResponseI) {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const passToken = await PasswordToken.findOne({ email: email });
    if (passToken) await PasswordToken.findByIdAndDelete(passToken._id);
    const payload = { email: email };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    console.log("token", token);

    const newPassToken = new PasswordToken({ email: email, token: token });
    await newPassToken.save();
    const html = `<h1 style='width:fit-content; margin: 0 auto;'>Library Management System</h1><p>Copy the following link to reset your password</p> localhost:3000/reset-password/${token}<p></p>`;
    sendMail(email, html);
    return res
      .status(200)
      .json({
        message:
          "A link to reset your password has been sent. Please check your email",
      });
  } catch (e) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
export async function resetPassword(
  req: express.Request,
  res: express.Response
) {
  const receivedToken = req.params.token;

  try {
    const payload = jwt.verify(receivedToken, process.env.SECRET_KEY);
    const passToken = await PasswordToken.findOne({ email: payload["email"] });
    if (!passToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const email = passToken.email;
    const salt: string = bcrypt.genSaltSync(10);
    const hashedPassword: string = await hashString(req.body.password, salt);
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      { password: hashedPassword, salt }
    );

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    await PasswordToken.findOneAndDelete({ email: email });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}
