//  I will write my server express code
const express=require("express"); // common js module
const app=express();
const cors=require("cors");

const arr=[] ; // in memory database
let feedbackData=[];

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


// feedback apis

app.post("/feedback",(req,res)=>{
    // we will save the users data 
    let id=makeid(20)
    req.body.id= id
    
    feedbackData.push(req.body);
    res.json({
        message:"feedback stored successffully",
        id

    })

})

app.put("/feedback",(req,res)=>{
    // we will save the users data 
    
    let id=req.body.id
    // filter out old data 
    feedbackData=feedbackData.filter(ele=>ele.id!=id) 
    // push new data
    feedbackData.push(req.body);
    res.json({
        message:"feedback edited successffully"

    })

})

app.delete("/feedback/:id",(req,res)=>{
    // we will save the users data 
    let id=req.params.id
    feedbackData=feedbackData.filter(ele=>ele.id!=id)
    res.json({
        message:"feedback deleted successffully"

    })

})

app.get("/feedback",(req,res)=>{
    // we will save the users data 
  
    res.json({
        message:"success",
        data:feedbackData,

    })

})

app.listen(8080,function(){
    console.log("server running on port 8080")
})