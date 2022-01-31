const express =require('express');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const cors = require('cors')
const app=express();

//<--------- middlewares ---------->

dotenv.config({ path: './config.env' });
app.use(cookieParser());
app.options("*",cors())
require('./db/conn');

app.use(express.json());
app.use("/api",require("./routes/register"));
app.use("/api",require("./routes/login"));
app.use("/api", require("./routes/location"));
app.use("/api", require("./routes/send-data"));
app.use("/api", require("./routes/profile"))

//<---------------- end ------------------> 

app.listen(process.env.PORT,()=>{
  console.log(`Server listening on port ${process.env.PORT}`);
})