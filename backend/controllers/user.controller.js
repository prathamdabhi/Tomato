import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user
const loginUser = async (req,res) => {
try {
    const { email, password } = req.body;
    if(!email || !password){
        return re.status(401).json({message:"All fields are required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({success:false,message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(401).json({success:false,message:"Invalid credentials"});
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

    return res.status(201).json({success:true,user,token});
} catch (error) {
    console.log(error)
    res.status(401).json({success:false,message:error.message})
}
}

const registerUser = async (req,res) => {
try {
    const { name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(401).json({message:"All fields are required"});
    }

    const exist = await User.findOne({email});
    if(exist){
        return res.status(401).json({success:false,message:"User already exist"});
    }
    if(!validator.isEmail(email)){
        return res.status(401).json({success:false,message:"Invalid email"});
    }
    if(password.length < 8){
        return res.status(401).json({success:false,message:"Password must be at least 8 characters"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    const createUSer = {
        name,
        email,
        password:hashPassword
    }

    const newUser = new User(createUSer)
    const user = await newUser.save();
    const token = jwt.sign({id:user.id},process.env.JWT_SECRET );
    return res.status(201).json({success:true,user,token});
    
} catch (error) {
    console.log(error)
    res.status(401).json({success:false,message:error.message})
}
}

export {
    loginUser,
    registerUser
}