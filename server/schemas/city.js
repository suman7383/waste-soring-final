const mongoose=require('mongoose');

const citySchema = new mongoose.Schema({

  state:{
    type:String,
  },
  city:{
      type:Array,
    },
   
},{
    timestamps : true
});

const City = mongoose.model('city',citySchema);

module.exports=City;