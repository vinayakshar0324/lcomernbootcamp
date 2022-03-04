const express = require("express");

const app = express();

const port = 8000;

const admin = (req, res) => {
    return res.send("home page")
};

const isAdmin = (req, res, next) => {
    console.log("admin is runnig");
    next();
};

const islogedIn = (req, res, next) => {
    console.log("login sucessful");
}

app.get('/', (req, res) => {
    return res.send("hello There");
});


app.get('/admin', isAdmin, islogedIn,admin)



app.listen(port, () => {
    console.log("server is running up at ${port}");
});







// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })