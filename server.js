const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const LeadSchema = new mongoose.Schema({

    name:String,
    phone:String,
    location:String,
    bookingDate:String,
    time:String,
    status:String,
    event:String,
    amount:Number,
    notes:String

});

const Lead = mongoose.model("Lead", LeadSchema);


// GET LEADS
app.get("/getLeads", async(req,res)=>{

    const leads = await Lead.find();

    res.json(leads);

});


// ADD LEAD
app.post("/addLead", async(req,res)=>{

    try{

        const lead = new Lead(req.body);

        await lead.save();

        res.json({
            success:true
        });

    }catch(err){

        res.status(500).json({
            error:err
        });

    }

});


// DELETE LEAD
app.delete("/deleteLead/:id", async(req,res)=>{

    await Lead.findByIdAndDelete(req.params.id);

    res.json({
        success:true
    });

});


// SERVE STATIC FILES
app.use(express.static(__dirname));


// HOME ROUTE
app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname,"index.html"));

});


app.listen(8000,()=>{

    console.log("Server Running on 8000");

});