import jwt from 'jsonwebtoken'
import { Akey } from '../config/config.js'

const authenticate = async (req, res, next) =>{
    //const {token} = req.Headers.Cookie
    console.log(req.headers)
    return
    console.log(token)
    if (!token) return res.status(401).json({ error: 'Not authorized' }) 

    try {
        const decoded = jwt.verify(token, Akey) 
        req.user = decoded  
        next() 
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid or expired' }) 
    }
}

export default authenticate