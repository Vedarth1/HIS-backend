const mongoose = require("mongoose");

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("connected!"))
    .catch((error)=>{4
        console.log("issue in db connection");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports=dbconnect;