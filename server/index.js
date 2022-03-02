const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 3001;
const cors = require("cors");

//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "Password123",
    database : "Reqsystem",
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const reqParts = req.body.reqParts;
    const comments = req.body.comments;

    // insert into database
    db.query(
        "INSERT INTO requests (name, email, reqParts, comments) VALUES (?, ?, ?, ?)",
        [name, email, reqParts, comments], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    )
});

app.get('/parts', (req, res) => {
    db.query("SELECT * FROM requests", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => { 
    console.log("running on port 3001.");
});

