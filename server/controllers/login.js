const Registration = require("../schemas/registration");
const utils = require("../utils/auth")
const jwt=require('jsonwebtoken');

module.exports.login = async (req, res)=>{
  const { email, password, type } =req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    const data = await Registration.findOne({email:email,password:password, user_type:type});
    if(data){
      const token = await utils.generateAuthToken(email,type,data.firstName,data.lastName);
      res.status(200).json({msg:"Logged In!",data:data,token:token});
    }else{
      res.status(404).json({err:"Email or password is invalid! Please try Again"});
    }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}

module.exports.isAuthenticated = async(req, res)=>{
  const { token } = req.body;
  try{

     res.setHeader('Access-Control-Allow-Origin', '*');
     console.log(token)
    if(token){
        const user=await jwt.verify(token,process.env.JWT_KEY);
        if(user){
            const data={email:user.email, type:user.type};
            res.status(200).send(data);
        }else{
            res.status(401).json({msg:"not authenticated!"});
        }
    }else{
      res.status(401).json({msg:"not authenticated!"});
    }

    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}