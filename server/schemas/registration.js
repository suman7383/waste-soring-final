const mongoose=require('mongoose');

const registerSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  secondName:{
    type:String,
    required:true,
  },
  user_type:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
    index:true,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  state:{
    type:String,
    required:true,
  },
  city:{
    type:String,
    required:true,
  },
  locality:{
    type:String,
    required:true,
  },
  phoneNumber:{
    type:Number,
    required:false,
    allowNull:true,
  },
  collector_id:{
    type:String,
    required:false
  },
  about:{
    type:String,
  }

},{
    timestamps : true
});

const Registration = mongoose.model('Registrations',registerSchema);

module.exports=Registration;