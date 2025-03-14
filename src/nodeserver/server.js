import express  from express;
const app= express();
const port=8000;
app.post('/submit',(req,res)=>{
const formdata=req.body;
console.log('Received form data',formdata);
const responseobject={
    message:'formdata received',
    data:formdata};
    res.json(responseobject);

}

);
app.listen(port,()=>{
    console.log("server is running");

});
