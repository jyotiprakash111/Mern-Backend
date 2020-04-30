const express = require("express");

const app = express();

const port = 8000
app.get("/", (req, res) => {
    return res.send("Thanks For Visiting")
})
app.get("/Login", (req, res) => {
    return res.send("You are visiting Login Router")
})

app.get("/Signup", (req, res) => {
    return res.send("You are visiting Signup Router")
})

app.listen(port, () => {
    console.log("Server Is Up Running...")
})
// const port = 3000
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))