let express = require("express");
let mysql = require('mysql');
let router = express.Router();
let length = 0; // ATTENZIONE BISOGNA CAMBIARLA QUANDO SI AUMENTANO I RISTORANTIv

let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password"
});

function find(obj, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

function insertRows(cmd){
    con.query("INSERT INTO menus (restaurant,dish,price) VALUES ("+cmd+");",(err)=>{
        if(err) throw err;
        console.log("Inserted dish");
    });
}

con.connect(function(err) {
    if(err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS waiter;",(err)=>{
        if(err) throw err;
        console.log("Database created");
        
        con =  mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"password",
            database : "waiter"
        });
        con.query("CREATE TABLE IF NOT EXISTS accounts (username VARCHAR(255), password VARCHAR(255), seller BOOLEAN);",(err)=>{
            if(err) throw err;
            console.log("Table created");
        });
        con.query("CREATE TABLE IF NOT EXISTS menus(id INT AUTO_INCREMENT PRIMARY KEY, restaurant VARCHAR(255), dish VARCHAR(255), price VARCHAR(255));",(err)=>{
            if(err) throw err;
            console.log("Table created");
            con.query("DELETE FROM menus;",(err)=>{
                if(err) throw err;
                //prove
                insertRows("'Ristorante1','Piatto1',23");
                insertRows("'Ristorante1','Piatto2',21");
                insertRows("'Ristorante2','Piatto1',11");
                insertRows("'Ristorante2','Piatto2',10");
            });
        });
        con.query("CREATE TABLE IF NOT EXISTS messages(id INT AUTO_INCREMENT PRIMARY KEY, sender VARCHAR(255), recipient VARCHAR(255), orders VARCHAR(255), complete BOOLEAN);",(err)=>{
            if(err) throw err;
            console.log("Table created");
        });

        con.query("CREATE TABLE IF NOT EXISTS restaurants(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), restaurant VARCHAR(255));",(err)=>{
            if(err) throw err;
            console.log("Table created");
        });
    });
}); 

router.post('/login',function(req,res){
    con.query("SELECT seller FROM accounts WHERE username = '"+req.body["name"]+"' AND password = '"+req.body["password"] +"'",(err,result) => {
        if(err){
            res.send("error");
            return;
        }

        if(result[0].seller === undefined){
            res.send("error");
            return;
        }
        console.log(result[0].seller);
        res.send(result[0].seller.toString());
    });
});

router.post('/signin',function(req,res){
    let sell = "false";

    console.log(req.body["isSeller"]);
    if(req.body["isSeller"].toString() == "true"){
        sell = "true";
    }else{
        sell = "false";
    }

    let str = "'" + req.body["name"] + "','" +req.body["password"]+"'," + sell;
    let sql = "INSERT INTO accounts(username,password,seller) VALUES("+str+")";
    con.query(sql,(err) => {
        if(err){
            res.send("error");
            throw err;
        }
        res.send("good");
    });

    con.query("INSERT INTO restaurants(username,restaurant) VALUES('"+req.body["name"] + "','" + req.body["restname"]+"')",(err)=>{
        if(err){
            console.log("error at restaurants");
            throw err;
        }
    });
});

router.get('/', function(req, res, next) {
    res.send("API IS WORKING...");
});

router.get('/getRestaurants', function(req, res, next) {
    con.query("SELECT restaurant FROM menus",(err,result)=>{
        if(err) throw err;
        let r = [];
        length = result.length;
        for(let i = 0; i < result.length;i++){
            if(!find(result[i]["restaurant"],r)){
                r.push(result[i]["restaurant"]);
            }
                
        }
        res.send(r);
    });
});

router.post('/getMessages', function(req, res) {
    con.query("SELECT id,sender,orders,complete FROM messages WHERE recipient = '"+req.body["username"]+"'",(err,result)=>{
        if(err) throw err;
        let r = [];
        
        for(let i = 0; i < result.length;i++){
            r.push([result[i]["id"],result[i]["sender"],result[i]["orders"],result[i]["complete"]]);
        }

        res.send(r);
    });
});

router.get('/getMenus', function(req, res, next) {
    con.query("SELECT * FROM menus",(err,result)=>{
        if(err) throw err;
        let r = {}
        for(let i = 0; i < length; i++){
            if(find(result[i]["restaurant"],Object.keys(r))){
                r[result[i]["restaurant"]].push([result[i]["dish"],result[i]["price"]]);
            }else{
                r[result[i]["restaurant"]] = [[result[i]["dish"],result[i]["price"]]];
            }
        }
        res.send(r);
    });
});

router.post('/order',(req,res)=>{
    let id, username;
    con.query("SELECT id FROM menus WHERE restaurant = '"+req.body["rest"]+"' AND dish = '"+req.body["dish"] +"'",(err,result)=>{
        if(err) {res.send("error");throw err;}

        console.log(result);
        console.log(result[0]["id"]);
        id = result[0]["id"].toString();

        con.query("SELECT username FROM restaurants WHERE restaurant = '"+req.body["rest"]+"'",(err,result)=>{
            if(err) {res.send("error");throw err;}
    
            console.log(result);
            console.log(result[0]["username"])
            username = result[0]["username"];

            let str = "'" + req.body["user"] + "','" + username + "','" + id + "',false";
            con.query("INSERT INTO messages(sender,recipient,orders,complete) VALUES("+str+")",(err,result)=>{
                if(err) {res.send("error");throw err;}
                
                res.send("aposto");
                console.log("tutto ok");
            });
        });
    });
    console.log(req.body["rest"])
    
    
});

module.exports = router;
