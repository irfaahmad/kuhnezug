// notes: have to seperately install express and 

const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 3001;
// must install cors for requests from front end to back end
const cors = require("cors");

//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "Irfaasdfgh31",
    database : "peopletutsystem",
});

// req is to get from front end, res is to send to front end
app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;

    // insert into database
    db.query(
        "INSERT INTO people (name, age, country) VALUES (?, ?, ?)",
        [name, age, country], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    )
});

// express has the standard req/res arguments already set ind
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM people", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// starts the server, then write node index.js to actually start the server
app.listen(PORT, () => { 
    console.log("yay, running on port 3001!");
});

