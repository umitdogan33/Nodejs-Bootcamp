const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open",() =>{
    console.log("db bağlantısı başarılı");
});


const  connectDb = async() => {
    await Mongoose.connect('mongodb://127.0.0.1:27017/asana',{
        useNewUrlParser : true,
        useUnifiedTopology:true,
    })
}
module.exports ={
    connectDb
}