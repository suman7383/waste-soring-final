const mongoose=require('mongoose');

const wasteDataSchema = new mongoose.Schema({

  userId:{
    type:String,
  },
  name:{
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
  organicWaste:{
      total:{
        type:Number,
      },
      waste:{
        type:Array,
      }
   }
  ,
  recyclableWaste:
    {
      total:{
        type:Number,
      },
      waste:{
        type:Array,
      }
    }
  ,
  electronicWaste:
    {
      total:{
        type:Number,
      },
      waste:{
        type:Array,
      }
    },
  locality:{
    type:String,
  },  
  date:{
    type:String,
  }  
   
},{
    timestamps : true
});

const WasteData = mongoose.model('wasteData',wasteDataSchema);

module.exports=WasteData;