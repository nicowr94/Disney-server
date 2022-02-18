import { Schema, model } from "mongoose";

export const ROLES = ["admin", "user", "moderator"];

const roleSchema = Schema(
  {
    name: { type: String, unique: true, require: true },
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
