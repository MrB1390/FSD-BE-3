import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: 0,
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
    maxLength: 50,
  },
  role : {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    maxLength: 250,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone Number is required"],
  },
});

userSchema.pre("save", async function (next) {
  try {
    const count = await User.countDocuments({});
    this.userId = count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchema);
export default User;
