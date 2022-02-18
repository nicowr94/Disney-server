import { Schema, model } from "mongoose";
const logSchema = Schema(
  {
    name: { type: String, require: true },
    id_user: { type: String, require: true },
    email: { type: String, require: true },
    device: { type: String, require: true },
    token: { type: String, require: true },
    status: { type: Number, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Log", logSchema);
