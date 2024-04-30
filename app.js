

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const email = req.body.Email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/7bc3e564dc";

    const options = {
      method: "POST",
      auth : "Tharu:7a06d06a3072edb8190a3d4c45de9178-us18"
    }

    const request = https.request(url, options, function(response){

      if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/Failure.html");
      }
      response.on("data" , function(data){
        console.log(JSON.parse(data));
      })
    })
    request.write(jsonData);
    request.end();

  });


app.listen(3000, function(){
  console.log("server is up and running")

});
//$API_SERVER = us18
//7a06d06a3072edb8190a3d4c45de9178-us18
// 7bc3e564dc
