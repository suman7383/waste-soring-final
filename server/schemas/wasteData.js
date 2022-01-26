const mongoose=require('mongoose');

const wasteDataSchema = new mongoose.Schema({

  userId:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
    index:true,
    required:true,
  },
  totalWasteCount:{
    type:Number,
  },
  organicWaste:[
    {
      total:{
        type:Number,
      },
      waste:{
        type:Array,
      }
   }
  ],
  recyclableWaste:[
    {
      total:{
        type:Number,
      },
      waste:{
        type:Array,
      }
    }
  ],
  electronicWaste:[
    {
      total:{
        type:Number,
      },
      waste:{
        type:Array,
      }
    }
  ],
   
},{
    timestamps : true
});

const WasteData = mongoose.model('wasteData',wasteDataSchema);

module.exports=WasteData;