const express = require("express");
const https= require("https");
const bodyParser= require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
   res.sendFile(__dirname +"/index.html");

})

app.post("/", function(req,res){
    const cityName= req.body.cityName;
    const apiKey="c4d529073e62557867b60bc2e696563d"

    const url= "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey
    https.get(url, function(response){
       response.on("data",function(data){
         const weatherInfo= JSON.parse(data);
         const weatherDescription= weatherInfo.weather[0].description;
         const icon= weatherInfo.weather[0].icon;

         const imageUrl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
         res.write("<p>The weather description is given as: "+weatherDescription+"</p>");
         res.write("<img src="+imageUrl+">");
         res.send();
       })
    })
})



app.listen(3000, function(){
    console.log("server is running at port 3000");
})

