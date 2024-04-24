import mongoose, { Document, Schema } from "mongoose";

import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  comparePassword: (enteredPassword: string) => boolean;
}

const userSchema = new Schema<IUser>({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
});

userSchema.methods.comparePassword = async function (enteredPassword: string)
{
  return await bcrypt.compare(enteredPassword, this.password);
  
}

const User = mongoose.model("User", userSchema);
export default User;
