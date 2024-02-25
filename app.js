//  I will write my server express code
const express=require("express"); // common js module
const app=express();
const cors=require("cors");

const arr=[] ; // in memory database

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

app.use(cors());
app.use(express.json()); // its a middleware which parses the request
app.post("/signup",(req,res)=>{
    // we will save the users data 
    let username=req.body.username;
    let user=arr.find(ele=>ele.username==username);
    if (user){
        res.json({
            message:"username already exists",
        
        })

        return;
    }
    arr.push(req.body);
    res.json({
        message:"User stored successffully"

    })

})

app.get("/",(req,res)=>{
    res.json(
        {
            message:"success",
            data:arr
        }

    )
})

app.post("/login",(req,res)=>{
    // we will save the users data 
    console.log(req.body);
    let username=req.body.username;
    let user=arr.find(ele=>ele.username==username);
    if (user){
        res.json({
            message:"Login success",
            token:makeid(10)
        })

        return;
    }
res.json({
    message:"failed"
})
    
})

app.listen(8080,function(){
    console.log("server running on port 8080")
})