const bcrpyt = require('bcrypt')
const User = require('../models/UserSchema')

exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashedPassword = await bcrpyt.hash(password, 10);
    const newuser = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });
    await newuser.save();
    res.status(200).json(newuser);
  } catch (err) {
    res.status(500).json({ error: "Registration error" });
  }
};


exports.login = async(req, res)=>{
    try{
        const { email, password} = req.body // Extract the email and password from the request body
        
        if(!email || !password){
            res
              .status(400)
              .json({ error: "Please provide email and password" });
            return;
        }

        const user = await User.findOne({email:email})
        if(!user){

            res.status(401).json({ error: "User not found" });
            return;
        }
        if(!(await bcrpyt.compare(password, user.password))){
             // Compare the password
            res.status(401).json({ error: "Invalid password" });
            return;
        }
        res.status(200).json({user});

    }
    catch(err){
    console.log(err);
        res.status(500).json("Login Error")
    }
}

