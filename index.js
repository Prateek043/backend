const express=require('express');
const bodyparser=require('body-parser');
const Routes=require('./Router/blogStat');
const { notFound, errorHandle } = require('./middleware/error')
const app=express();

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use('/api',Routes);

// app.use('/',(req,res)=>{
//     res.send("Hello from backend");
// })

app.use(notFound);
app.use(errorHandle);


app.listen(5000,()=>{
    console.log("Backend is running At port 5000");
})