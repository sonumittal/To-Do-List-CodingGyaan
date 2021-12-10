const express = require("express");//--require express module
const bodyParser=require("body-parser");//--require body-parser for whenever we send request for something to anywhere we use body-parser
const app = express();//--creating express application
app.set('view engine','ejs');//--seting view engine for <% --- %> use sending list.ejs (in view folder) data in the form of  request to server
app.use(express.static("public"));//---in public folder all files are static using staic and all public files will be used auto in this page
app.use(bodyParser.urlencoded({extended:true}));//---using body-parser for url encoded data
var i1=[];

app.get('/', function(req,res){//---sending request to server so can be displayed on web page whatever here
//res.send("<h1>Hey Sonu!</h1>")
res.render("list",{newListItems:i1})//--list.ejs template (in views folder) and newsListItem will send render data to browser from here directly cz of app.set('view engine','ejs');
})
app.post("/",function(req,res){//----whenever we get situaction when we need to send data to server specially from the form then we use post method for sending data to server
    var i=req.body.user_name;//---sending request for user_name in list.ejs form for webpage to server by body-parser
    //console.log(i);//---user name will be shown here that we will ener in form
    i1.push(i);//--pussing all submit button value into array
    //res.render("list",{newListItems:i1});//--for sending server l1 list data to webpage again for showing 
    res.redirect("/");//--for sending items values to get mrthod so request can be goto our server 
})

app.listen(3000,function(){//--creating server for listening in browser for port 3000 localhost:3000
    console.log("Listening to port 3000");
})