import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema(
  {
    name: { type: String, unique: true , required: true },
    email: { type: String, unique: true , required: true },
    password: { type: String, required: true },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
