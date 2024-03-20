const User = require('../model/user') 
const Departement = require('../model/departement'); 
const Unite = require('../model/unite');

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
            departement,
            unite
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
            departement,
            role,
            unite

        })
        return res.json(user)
    }catch(error){
        console.log(error)
    }
}

//login endpoint
// const loginUser = async (req, res)=>{
//     try {
//         const { email, password}= req.body;

//         //Check if user exists
//         const user = await User.findOne({email});
//         if(!user){
//             return res.json({
//                 error: 'No user found'
//             })
//         }

//         //check if passwords match 
//         const match = await comparePassword(password, user.password)
//         if(match){
//             jwt.sign({
//                 id:user._id ,
//                 email:user.email, 
//                 name:user.name, 
//                 role:user.role, 
//                 addresse:user.addresse, 
//                 gouvernorat:user.gouvernorat, 
//                 telephone:user.telephone, 
//                 dateNaissance:user.dateNaissance,
//                 gender:user.gender,
//                 departement: user.departement._id, // Inclure le nom du département
//                 unite: user.unite._id // Inclure le nom de l'unité
//              },process.env.JWT_SECRET,{},(err,token)=>{
//                 if(err)throw err;
//                 res.cookie('token',token).json(user)
//             })
//         }
//         if(!match){
//             res.json({
//                 error: 'Passwords do not match'
//             })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // Vérifier si les mots de passe correspondent
        const match = await comparePassword(password, user.password);
        if (match) {
            // Récupérer les détails du département associé à l'utilisateur
            const departement = await Departement.findById(user.departement);
            // Récupérer les détails de l'unité associée à l'utilisateur
            const unite = await Unite.findById(user.unite);

            // Créer le token JWT en incluant toutes les informations nécessaires
            const tokenPayload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                addresse: user.addresse,
                gouvernorat: user.gouvernorat,
                telephone: user.telephone,
                dateNaissance: user.dateNaissance,
                gender: user.gender,
                departement: departement.name, // inclure seulement le nom du département
                unite: unite.name // Inclure seulement le nom de l'unité
            };

            jwt.sign(tokenPayload, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.json({ error: 'Passwords do not match' });
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, decodedToken) => {
        if (err) {
          console.error("Erreur lors du décodage du token :", err);
          return res.status(500).json({ error: "Erreur lors du décodage du token" });
        }
        const { id, email, name, role,addresse,gouvernorat, dateNaissance, telephone,gender ,departement, unite } = decodedToken;
        if (!id) {
          return res.status(400).json({ error: "ID d'utilisateur non trouvé dans le token" });
        }
        // L'ID de l'utilisateur est disponible ici
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // désactive la mise en cache
        res.json({ id, email, name, role ,addresse,gouvernorat, dateNaissance,telephone,gender, departement, unite});
      });
    } else {
      res.json(null);
    }
};

const logout = (req, res) => {
    res.clearCookie('token').json({ message: 'Déconnexion réussie' });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logout
}