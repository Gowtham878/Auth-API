import dotenv from 'dotenv'
dotenv.config()

const TDB = process.env.DB //nameofdb
const dkey = process.env.DBKEY
const dad = process.env.admin
const cluster = process.env.cluster


const port = process.env.PORT
const Akey = process.env.THEREALSECRETKEY
const url = `mongodb+srv://${dad}:${dkey}@${cluster}/${TDB}?retryWrites=true&w=majority&appName=Cluster0`
            
export  {
    port,
    Akey,
    url,
}