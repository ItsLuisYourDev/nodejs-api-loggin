const app = require("./app")
app.listen(app.get("port"),()=>{
    console.log("server in port http://127.0.0.1:3001")
})
