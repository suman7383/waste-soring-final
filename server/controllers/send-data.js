const WasteData = require("../schemas/wasteData");
const Registration = require("../schemas/registration");
const Utils = require("../utils/date");

module.exports.send = async(req, res)=>{
  const { email, totalWasteCount, organicWaste, recyclableWaste, electronicWaste } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    let date = '2022-1-28';

    const userData = await Registration.findOne({email},{firstName:1, secondName:1, locality:1});
    let name = userData.firstName+" "+userData.secondName;
    const dataExists = await WasteData.exists({email:email, date:date, locality:userData.locality});
    
    if(dataExists){
      await WasteData.findOneAndUpdate({email:email,locality:userData.locality,date},
        {$push:{"organicWaste.waste":organicWaste.waste,"recyclableWaste.waste":recyclableWaste.waste,
        "electronicWaste.waste":electronicWaste.waste},
        $inc:{ totalWasteCount: totalWasteCount,
          "recyclableWaste.total":recyclableWaste.total,
          "organicWaste.total":organicWaste.total,
          "electronicWaste.total":electronicWaste.total}});
        }
    else{

      const options={
        name,
        email,
        totalWasteCount,
        organicWaste,
        recyclableWaste,
        electronicWaste,
        locality:userData.locality,
        date
      }

      const data = await new WasteData(options);
      await data.save();
    }
  
    res.status(200).json({msg:"Data uploaded successfully!"});
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}

module.exports.sendToFront = async (req, res)=>{
  const { locality } = req.query;

  let date = '2022-1-28';

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    const data = await WasteData.find({date:date,locality:locality}); 

    let dataToSend = [];

    data.forEach((elm)=>{
      let organicPer = parseFloat((elm.organicWaste.total/elm.totalWasteCount)*100).toFixed(2);
      let recyclablePer = parseFloat((elm.recyclableWaste.total/elm.totalWasteCount)*100).toFixed(2);
      let electronicPer = parseFloat((elm.electronicWaste.total/elm.totalWasteCount)*100).toFixed(2);
      let dataCurr={
        name :elm.name,
        organicCount : `${organicPer}%`,
        recyclableCount : `${recyclablePer}%`,
        electronicCount : `${electronicPer}%`
      }

      dataToSend.push(dataCurr);
    })
    res.status(200).json(dataToSend);

  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}