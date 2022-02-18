import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import * as loghCtrl from "./log.controller";

export const signup = async (req, res) => {
  const { name, email, password, roles } = req.body;
  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const foundRoles = await Role.findOne({ name: "user" });
    newUser.roles = [foundRoles._id];
  }

  const saveUser = await newUser.save();
  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400 * 7, //24 horas x 7 (7 dias)
  });

  res.status(200).json(token);
};

export const signin = async (req, res) => {
  const mobile = req.body.mobile || "null";
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "User not found" });


  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400 * 7, //24 horas x 7 (7 dias)
  });

  //Registrar LOG
  const reqLog = {
    username: userFound.name,
    id_user: userFound._id,
    token,
    email: userFound.email,
    device: mobile,
    status: 1,
  };

  await loghCtrl.invalidateLogByEmail(userFound.email);
  await loghCtrl.createLog(reqLog);

  res.status(200).json({
    token: token,
    user: {
      name: userFound.name,
      email: userFound.email,
      id: userFound._id,
      role: userFound.roles.length ? userFound.roles[0].name : "",
    },
  });
};

export const logout = async (req, res) => {
  const token = req.headers["x-access-token"];
  const logoutToken = await loghCtrl.invalidateLogByToken(token);

  if (logoutToken.status != 200)
    return res.status(401).json({ message: logoutToken.message });
  res.status(200).json({ token: token });
};

export const verifyLogin = async (req, res) => {
  const token = req.headers["x-access-token"];
  const validateLogByToken = await loghCtrl.validateLogByToken(token);
  if (validateLogByToken.status !== 200)
    return res.status(401).json({ message: validateLogByToken?.message });
  return res.status(200).json({ result: validateLogByToken.result });
};
