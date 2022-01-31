const City = require("../schemas/city");
const Locality = require("../schemas/locality");

module.exports.addCity = async(req, res)=>{
  const { state, city } = req.body;

  try{
    
    const options = {
      state:state,
      city:city,
    }
    const data = await new City(options);
    await data.save();
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json({msg:"Success!"});
  }catch(err){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({msg:"internal server error"});
    console.log(err);
  }
}

module.exports.getCity = async(req, res)=>{
  const { state } =req.query;

  try{

    console.log(state);
    const data = await City.findOne({state:state},{city:1, _id:0});
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({msg:"success!",data});
  }catch(err){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({msg:"Internal server error!"});
    console.log(err);
  }
}

module.exports.addLocality = async(req, res)=>{
  const { state, city, locality } = req.body;

  try{

    const options = {
      state,
      city,
      locality,
    }
  
    const data = await new Locality(options);
    await data.save();
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({msg:"Success!"});
  }catch(err){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({msg:"Internal server error!"});
    console.log(err);
  }
}

module.exports.getLocality = async(req, res)=>{
  const  { state, city } = req.query;

  try{

    const data = await Locality.findOne({state:state, city:city},{locality:1,_id:0,});
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({msg:"success!", data});
  }catch(err){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({msg:"Internal server error!"});
    console.log(err);
  }
}