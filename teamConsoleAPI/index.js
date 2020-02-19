const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//*DATABASE CONNECTION
var db = mongoose.createConnection('mongodb://localhost:27017/login_test', { useNewUrlParser: true, useUnifiedTopology: true });

if (!db) {
    console.log("False");
}
else {
    console.log("True");
}

//*SAMPLE REQUEST
app.get('/retrieve', (req, res) => {
    db.collection("Login").find({}).toArray(
        (err, result) => {
            if (err) throw err;
            res.send(result)
        }
    )
})
//*REGISTER REQUEST
app.post('/register', (req, res) => {
    var obj = req.body;
    db.collection("Login").insertOne({
        "username": obj.Username,
        "password": obj.Password
    }, (err) => {
        if (err) throw err;
        res.send({Message:"Registered"})
    })
})

//*LOGIN REQUEST
app.post('/login', function (req, res) {
    var username1 = req.body.Username;
    var password1 = req.body.Password;
    db.collection("Login").find({
        username: username1,
        password: password1
    }).toArray(function (err, result) {
        if (err) {
            res.send("Error");
        }
        else if (result.length == 0) {
            res.send({Message:'Enter correct username or password'});
        }
        else {
            console.log(result[0].username + " " + result[0].password + " have successfully logged in")
            res.send({Message:'Successful',Result:result[0]});
        }
    })
});

//*CREATE TEAM
app.post('/teamCreate', (req, res) => {
    var obj = req.body
    db.collection("Team").insertOne(
        {
            "name": obj.Name,
            "players": obj.Players,
            "tagline": obj.TagLine,
            "createdby": obj.CreatedBy
        },
        function (err) {
            if (err) throw err;
            res.send("Successfully Created Team");
        }
    )
});

//*CREATE PLAYER
app.post('/playerCreate', (req, res) => {
    var obj = req.body
    db.collection("Player").insertOne(
        {
            "name": obj.Name,
            "team_id": obj.TeamName,
            "skill": obj.Skills,
            "created_by": obj.CreatedBy
        },
        function (err) {
            if (err) throw err;
            res.send({Message : 'Successfully Created Player'});
        }
    )
});

//*TEAM DELETE
app.post('/teamDelete', (req, res) => {
    var obj=req.body
    var a = obj.Name;
    var b = a;
    db.collection("Team").deleteOne({
        name: a,
    }, function (err) {
        if (err) throw err;
    });
    db.collection("Player").deleteMany({
        team_id: b,
    }, function (err) {
        if (err) throw err;
    });
    res.send({Message:"Deleted"})
})

//*PLAYER DELETE
app.post('/playerDelete', (req, res) => {
    var obj = req.body
    db.collection("Player").deleteOne({
        name: obj.Name,
    }, function (err) {
        if (err) throw err;
        res.send({Message:"Deleted"});
    })
});

//*TEAM VIEW
app.get('/teamList', (req, res) => {
    db.collection("Team").find({
    }).toArray(function (err, result) {
        if (err) throw err;
        res.send({data:result,value:result.length,Message:'FOUND'})
        console.log(result.length);
    })
});

//*PLAYER VIEW
app.get('/playerList', (req, res) => {
    db.collection("Player").find({
    }).toArray(function (err, result) {
        if (err) throw err;
        res.send({data:result,value:result.length,Message:'FOUND'})
        console.log(result.length);
    })
});

//*PORT
app.listen(3000)