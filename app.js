const express = require("express"); //--require express module
const mongoose = require("mongoose"); //--require mongoose module for MongoDb database connectivity and query
const bodyParser = require("body-parser"); //--require body-parser for whenever we send request for something to anywhere we use body-parser
const app = express(); //--creating express application
app.set('view engine', 'ejs'); //--seting view engine for <% --- %> use sending list.ejs (in view folder) data in the form of  request to server
app.use(express.static("public")); //---in public folder all files are static using staic and all public files will be used auto in this page
app.use(bodyParser.urlencoded({
    extended: true
})); //---using body-parser for url encoded data
//var i1=[];//--blank list we dont need here list cz we will use database for collection

//--------------------------------Database---------------------------------
mongoose.connect("mongodb://localhost:27017/todolistDB"); //---connecting with MongoDB database on this aaddress localhost:27017/todolistDB
//--creating schema for item name--
const itemSchema = {
    name: String //name string data type
}
//---creating model--
const Item = mongoose.model("Item", itemSchema);

//--creating some items for database
const item1 = new Item({
    name: "Welcome Sonu Mittal",
})
const item2 = new Item({
    name: "How are you?",
})
const item3 = new Item({
    name: "Nice to Meet you!",
})
const d = [item1, item2, item3]; //--pussing all items to one aary


//-----------------------------------------end of Database---------------------

//-------------mian code for showing  data on browser-----------------
app.get('/', function (req, res) { //---sending request to server so can be displayed on web page whatever here
    //res.send("<h1>Hey Sonu!</h1>")

    
    Item.find({}, function (err, f) { //---//------fetching all items from DB--- and here {} for fetching all items and second is call back function and there paremater err will have error if it accure and 2nd perameter f will have all items if all good 
        //console.log(f);//---printing all fetched data

        if(f.length===0){
//---inserting array to Item model to DB 
        Item.insertMany(d, function (err) { //--inserting all items to collection
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved items to DB");
            }
        })
        res.redirect("/");//request will goto get method where callback function if condiition is true 
    }
    else{
    res.render("list", {newListItems:f}) //--list.ejs template (in views folder) and newsListItem will send render data to browser from here directly cz of app.set('view engine','ejs');
    }
    })
})

//-------------receaving data from form--------------------
app.post("/", function (req, res) { //----whenever we get situaction when we need to send data to server specially from the form then we use post method for sending data to server
    var itemName = req.body.user_name; //---sending request for user_name in list.ejs form for webpage to server by body-parser
    //console.log(i);//---user name will be shown here that we will ener in form
    //res.redirect("/"); //--for sending items values to get mrthod so request can be goto our server 
    const item=new Item({
        name:itemName
    })
    item.save();//---saving item to list
});
app.post("/delete",function(req,res){
    const check=req.body.checkbox;//---getting id for delete from list.ejs
    Item.findByIdAndRemove(check,function(err){//--query for deleting item
        if(!err){
            console.log("Successfully Deleted");
            res.redirect("/");
        }
    });
});

//--------------------------------------creating server----------
app.listen(3000, function () { //--creating server for listening in browser for port 3000 localhost:3000
    console.log("Listening to port 3000");
})