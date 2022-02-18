import { Promise } from "mongoose";
import Role from "../models/Role";
import User from "../models/User";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmi = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;
    const role = await Role.findOne({ name: "admin" });
    const newAdmi = new User({
      name: "Administrador",
      email: "admin@ejemplo.poc",
      password: await User.encryptPassword("admin123"),
      roles: role._id,
    });

    const saveAdmin = await newAdmi.save();
    console.log(saveAdmin);
  } catch (error) {
    console.error(error);
  }
};
