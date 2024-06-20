import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const roleUser = firstName === "admin" ? "admin" : "user";

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      role: roleUser
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if(!user) return res.status(400).json({ msg: "User does not exist"})

        if(password){
          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch) return res.status(400).json({ msg: "Invalid credentials"})
  
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
          delete user.password
          res.status(200).json({ token, user });
        } else {
          return res.status(200).json({ msg: "Email found. Provide password"})
        }
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const deleteUser = async (req,res) => {
  try{
    const {id, email} = req.body;

    const user = await User.findOne({ _id: id })
    if(user){
      await User.deleteOne({ _id: id, email: email });
    }else{
      throw new Error("User not found in the database")
    }

    return res.status(200).json({ msg: "User succesfully deleted from the database!"})
  }catch(err){
    console.log(err)
  }
}