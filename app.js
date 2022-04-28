const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/agriDb", { useNewUrlParser: true })




const agriSchema = new mongoose.Schema({
  userId: String,
  marketId: String,
  martketName: String,
  cmdtyId: String,
  marketType:String,
  cmdtyName:String,
  priceUnit:String,
  convFctr:Number,
  price: Number,
  
});

const Agri = mongoose.model("Agri", agriSchema);

app.post("/reports",(req,res)=>{
  console.log(req.body.price);
  console.log(req.body.userId);
  const newagri=new Agri({
    userId:       req.body.userId,
    marketId:     req.body.marketId,
    martketName:  req.body.marketName,
    cmdtyId:      req.body.cmdtyId,
    marketType:   req.body.marketType,
    cmdtyName:    req.body.cmdtyName,
    priceUnit:    req.body.priceUnit,
    convFctr:     req.body.convFctr,
    price:        req.body.price,
  });
  newagri.save(function(err,res){
    if (err){
      console.log(err);
  }
  else{
    console.log("success")
      console.log(res);
      
  }
    
  });
});
app.get("/reports",(req,res)=>{
  Agri.find(function(err,data){
      if(!err)
    res.send(data);
  });
});
app.get("/reports/:id",(req,res,next)=>{
  
  if ( !req.params.id ) 
            next('No ID');
            else
            next();
},
function(req,res){const id = req.params.id;
  Agri.findById(id,function(err,data){
    if(!err)
    res.send(data);
    else 
    console.log(err);
 })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


