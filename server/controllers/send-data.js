const WasteData = require("../schemas/wasteData");

module.exports.send = async(req, res)=>{
  const { email, totalWasteCount, organicWaste, recyclableWaste, electronicWaste } = req.body;

  try{

    const options={
      email,
      totalWasteCount,
      organicWaste,
      recyclableWaste,
      electronicWaste
    }
    const data = await new WasteData(options);
    await data.save();
  
    res.status(200).json({msg:"Data uploaded successfully!"});
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}