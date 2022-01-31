const Registration = require('../schemas/registration')

module.exports.data = async(req, res)=>{
  const { email } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    const data = await Registration.findOne({email},{password:0,});
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({msg:"Not Found!"})
    }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}

module.exports.dataC = async(req, res)=>{
  const { email } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    const data = await Registration.findOne({email},{password:0,});
    if(data){
      res.status(200).json(data)
    }else{
      res.status(404).json({msg:"Not Found!"})
    }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}
