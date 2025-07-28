import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { Akey } from '../config/config.js';

const token = jwt.sign({ userId: User._id }, Akey, {
  expiresIn: '1h',
});

const userLogin = async (req,res)=>{
    console.log("inuserlogin\n")
    const {identifer,password}=req.body
    console.log(identifer,", ",password)
    const existinguser = await User.findOne()
    const password2 = async (user)=>{
        let exists = await bcrypt.compare(password,user.password)
        return exists
    }
    if(!existinguser){
        //console.log(existinguser.email,", ",existinguser.username)
        return res.status(401).json({message:"users does not exists",identifer})
    }
    
    res.cookie('token', token, {
        httpOnly: true,      
        secure: true,        
        //sameSite: 'Strict',  
        maxAge: 4* 1000,
    })
    console.log("token: ",token)


    return res.status(201).json({message:"User is there"})

}

const userRegister = async (req,res)=>{ 
        console.log("inuserregc\n")

    const {username,email,password} = req.body

    try{
        const existinguser = await User.findOne({$or: [{ email: email }, { username: username }]})
        if(existinguser){
            console.log(existinguser.email," ",existinguser.username)
            return res.status(401).json({message:"Username or email already exists,"})
        }
        
        const user = new User({
            username,
            email,
            password
        })

        await user.save()

        return res.status(201).json({message:`User created details:${username}, ${email}, ${password}`})
    }
    catch(error){   
        console.log("erorr:",error)
        return res.status(501).json({message: error})

    }

}

const getUser = async (req,res)=>{
    const user = req.user
    console.log(user)
    

}

export { userLogin,userRegister,getUser}