import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true  // index true is done to make the search faster
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index:true
    },
    avatar: {
        type: String,  //Cloudinary URL here,
        required: true
    },
    coverImage: {
        type: String,  //Cloudinary URL here,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId, // array of object ids
            ref: "Video"
        }
    ],
    password: {
        type: String, // bcrypt hash here
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    },

},{timestamps:true}); // createdAt and updatedAt fields will be added automatically

userSchema.pre("save", async function(next) { //Alwasys use async function in pre hooks & dont use () => {} syntax here nbecause it will not have access to this keyword
    // this keyword will point to the document being saved
    if (!this.isModified("password")) return next(); // if password is not modified, skip hashing
    this.password = await bcrypt.hash(this.password, 10); // hash the password
    next();
});

//Method to generate JWT token
userSchema.methods.isPasswordCorrect = async function(password) { // instance method
    return await bcrypt.compare(password, this.password); // compare the password with the hashed password
}

userSchema.methods.generateAccessToken = function() { // instance method
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
     },
      process.env.ACCESS_TOKEN_SECRET,
      { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" // default to 1 day if not specified in env 
    }); // generate JWT token with user id and secret key
}
userSchema.methods.generateRefreshToken = function() { // instance method
    return jwt.sign(
        {
            _id: this._id,
     },
      process.env.REFRESH_TOKEN_SECRET,
      { 
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "1d" // default to 1 day if not specified in env 
    });
}

export const User=mongoose.model("User", userSchema);