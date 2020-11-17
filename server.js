const express = require("express")
const app = express()
const PORT = process.env.PORT || 3300
const connectdb = require('./config/db')
const path = require("path")
connectdb()
//templete engine
app.use(express.static('public'));
app.set("views",path.join(__dirname,'/views'))
app.set("view engine",'ejs')

app.use('/api/files',require('./routes/files'))
app.use('/files',require('./routes/show'))
app.use('/files/download',require('./routes/download'))
app.get("/",(req,res)=>{
res.render("main")
})
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})