const express = require('express')
const favicon = require('serve-favicon');
const exec = require('child_process').exec;
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

const app = express()

const port = process.env.port;
const path1 = process.env.a;
const cmd = process.env.e;
const f = process.env.c;
const path2 = process.env.b;
const f2 = process.env.d;


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('common', {stream: accessLogStream}, {
    skip: function (req, res) {
        return req.originalUrl === '/favicon.ico';
    }
}));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/favicon.ico', (req, res) => {
    res.send('Hello World!')
})


app.get(path1, (req, res) => {
    const id = req.params.id;
    if (!onlyDigits(id)) {
        res.send("not valid");
        return;
    }
    const command = cmd + id + f;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            res.send("not found");
        } else {
            res.send(stdout);
        }
    });
})


app.get(path2, (req, res) => {
    const id = req.params.id;
    if (!onlyDigits(id)) {
        res.send("not valid");
        return;
    }
    const command = cmd + id + f2;
    exec(command, (err, stdout, stderr) => {
        if (err) {
            res.send("not found");
        } else {
            res.send(stdout);
        }
    });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});


function onlyDigits(s) {
    for (let i = 0; i < s.length; i++) {
        const d = s.charCodeAt(i);
        if (d < 48 || d > 57) {
            return false;
        }
    }
    return true
}
