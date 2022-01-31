const Registration = require("../schemas/registration")

module.exports.updateProfile= async(req, res)=>{
  const { email, firstName, secondName, about } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    const exists = await Registration.exists({email});
    
  
    if(exists){
      const options={
        email,
        firstName,
        secondName,
        about
      }
      const data = await Registration.findOneAndUpdate({email},options);
  
      if(data){
        res.status(200).json({msg:"Updated!"})
      }
  }else{
    res.status(404).json({msg:"email not found!"})
  }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}

module.exports.updatePassword= async(req, res)=>{
  const { email, oldPass, newPass } = req.body;
  res.setHeader('Access-Control-Allow-Origin', '*');

  try{

    const isCorrect = await Registration.exists({email,password:oldPass});
    
  
    if(isCorrect){
      const options={
        password:newPass
      }
      const data = await Registration.findOneAndUpdate({email},options);
  
      if(data){
        res.status(200).json({msg:"Updated!"})
      }
  }else{
    res.status(404).json({msg:"email not found!"})
  }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}


