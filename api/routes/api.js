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
    });
}); 

router.post('/login',function(req,res){
    console.log(req.body);
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
    console.log(req.body);
    console.log(req.body["isSeller"].toString());
    let sell = "false";

    if(req.body["isSeller"].toString() == "on"){
        sell = "true";
    }else{
        sell = "false";
    }

    let str = "'" + req.body["name"] + "','" +req.body["password"]+"'," + sell;
    let sql = "INSERT INTO accounts(username,password,seller) VALUES("+str+")";
    con.query(sql,(err) => {
        if(err){
            console.log(err);
            res.send("error");
            return;
        }

        res.send("good");
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
    console.log(req.body);
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
            console.log(JSON.stringify(r));
        }
        res.send(r);
    });
});

module.exports = router;
