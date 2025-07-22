import bcrypt from 'bcrypt'
import User from './database/models/userModel'

const adminSeeder = async()=>{
    
   const [data] =  await User.findAll({
        where : {
            userEmail : process.env.ADMIN_EMAIL
        }
    })

    if(!data){
        await User.create({
            userName :process.env.ADMIN_USERNAME, 
            userPassword : bcrypt.hashSync(process.env.ADMIN_PASSWORD as string, 8), 
            userEmail : process.env.ADMIN_EMAIL, 
            role : "admin"
        })
        console.log("Admin Seeded Successfully!")
    }else{
        console.log("Admin Already Seeded!")
    }
}

export default adminSeeder