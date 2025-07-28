import Joi from 'joi';

const username = Joi.string().min(3).max(30).required();
const email = Joi.string().email().required();
/*const password = Joi.string()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$'))
  .required()
  .messages({
    'string.pattern.base': 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
  })*/
 const password = Joi.string().min(8).required()

export const userSchema = Joi.object({
  username,
  email,
  password
});

const loginSchema = Joi.object({
  identifer: Joi.alternatives().try(username,email).required(),
  password
});


const validateregister = (req,res,next)=>{
    const {error} = userSchema.validate(req.body)
    console.log("invalidatuserreg\n")

    if(error){
        console.log(error)
        return res.status(400).json({message:error.details[0].message})
    }
       
    next()

}

const validatelogin = (req,res,next)=>{
    console.log("REQ BODY:", req.body,"\n");
    const {error} = loginSchema.validate(req.body)
    console.log("invalidatuserlogin\n")

    if(error){
        console.log(error)
        return res.status(400).json({message:error.details[0].message})
    }
        
    next()
}

export  {validateregister,validatelogin}