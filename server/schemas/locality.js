const mongoose=require('mongoose');

const localitySchema = new mongoose.Schema({

  state:{
    type:String,
  },

  city:{
    type:String,
  },
  locality:{
      type:Array,
    },
   
},{
    timestamps : true
});

const Locality = mongoose.model('locality',localitySchema);

module.exports=Locality;