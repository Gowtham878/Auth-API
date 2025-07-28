import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
})

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next() 

        const salt = await bcrypt.genSalt(10) 
        this.password = await bcrypt.hash(this.password, salt)
        //this.resetkey = await bcrypt.hash(this.username, salt)
        console.log("Password has been encrypted") 
        next() 
    } catch (error) {
        console.log(error) 
    }
})


export default mongoose.model("User",userSchema)