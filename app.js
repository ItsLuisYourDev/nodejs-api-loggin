const express = require("express")
const app = express()
app.set("port",3001)

app.use(express.json());
app.use("/db", require("./router/bd"))
module.exports= app