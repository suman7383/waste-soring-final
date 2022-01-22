const express =require('express');
const dotenv=require('dotenv');
const app=express();

//<--------- middlewares ---------->

dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());
app.use("/",require("./routes/register"));

//<---------------- end ------------------> 

app.listen(process.env.PORT,()=>{
  console.log(`Server listening on port ${process.env.PORT}`);
})