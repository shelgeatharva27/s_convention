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

    advance:Number,
    bookingAmount:Number,
    due:Number,
    fullPayment:Number,
    maintenance:Number,

    notes:String

});

const Lead = mongoose.model("Lead", LeadSchema);
const InventorySchema = new mongoose.Schema({

    itemName:String,
    quantity:Number

});

const Inventory = mongoose.model(
    "Inventory",
    InventorySchema
);

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

app.put("/updateLead/:id", async(req,res)=>{

    try{

        await Lead.findByIdAndUpdate(
            req.params.id,
            req.body
        );

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
// GET INVENTORY

app.get("/getInventory", async(req,res)=>{

    const items = await Inventory.find();

    res.json(items);

});

// ADD INVENTORY

app.post("/addInventory", async(req,res)=>{

    try{

        const item = new Inventory(req.body);

        await item.save();

        res.json({
            success:true
        });

    }catch(err){

        res.status(500).json({
            error:err
        });

    }

});

// UPDATE INVENTORY

app.put("/updateInventory/:id", async(req,res)=>{

    try{

        await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.json({
            success:true
        });

    }catch(err){

        res.status(500).json({
            error:err
        });

    }

});

// DELETE INVENTORY

app.delete("/deleteInventory/:id", async(req,res)=>{

    await Inventory.findByIdAndDelete(
        req.params.id
    );

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