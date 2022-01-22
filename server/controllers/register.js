const Registration = require("../schemas/registration");

module.exports.register = async(req, res)=>{
  const { firstName, secondName, email, password, state, city, locality} = req.body;

  try{

    const options = {
      firstName,
      secondName,
      email,
      password,
      state,
      city,
      locality
    }
  
    const emailExists = await Registration.exists({email:email});
    if(emailExists){
      res.status(200).json({err:"Email already exists"});
    }else{
      const register = await new Registration(options);
      await register.save();
  
      res.status(200).json({msg:"Registered Successfully!"})
    }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}