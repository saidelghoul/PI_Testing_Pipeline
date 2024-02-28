const User = require('../model/user') 
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res)=>{
    res.json('test is working')
}


//register endpoint
const registerUser= async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            confirmedPassword,
            role,
            gouvernorat,
            //adresse,
            //telephone,
            //dateNaissance,
            //gender,
            //departement
        }=req.body;
        //check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };

        const nameExist = await User.findOne({ name });
        if (nameExist) {
            return res.json({
                error: 'Name is already taken'
            })
        }


        //check is password is good
        if(!password || password.length <6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };

         // check if confirmed password matches password
         if (password !== confirmedPassword) {
            return res.json({
                error: 'Confirmed password does not match password'
            })
        };
        
        //check email
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)
        const hashedConfirmedPassword = await hashPassword(confirmedPassword)

        //create user in database
        const user= await User.create({
            name,
            email,
            password: hashedPassword,
            confirmedPassword:hashedConfirmedPassword,
            gouvernorat,
            //adresse,
            //telephone,
            //dateNaissance,
            //gender,
           // departement,
            role,

        })
        return res.json(user)
    }catch(error){
        console.log(error)
    }
}

//login endpoint
const loginUser = async (req, res)=>{
    try {
        const { email, password}= req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }

        //check if passwords match 
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email:user.email, id: user._id, name:user.name, role:user.role},process.env.JWT_SECRET,{},(err,token)=>{
                if(err)throw err;
                res.cookie('token',token).json(user)
            })
        }
        if(!match){
            res.json({
                error: 'Passwords do not match'
            })
        }
    } catch (error) {
        console.log(error)
    }
}


const getProfile=(req, res)=>{
const {token} = req.cookies
if(token){
    jwt.verify(token, process.env.JWT_SECRET,{},(err,user)=>{
        if(err) throw err;
        res.json(user)
    })
}else{
    res.json(null) 
}
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}