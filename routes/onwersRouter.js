const express = require("express");
const router = express.Router();
const onwersModel = require("../models/owners-models");
const ownersModels = require("../models/owners-models");

router.get("/admin", function (req, res) {
   let success =  req.flash("success");
    res.render("createProducts", { success });
})

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
       let owners = await onwersModel.find();
       if(owners.length > 0){
        return res.status(500).send("you don't have permission to  a create a owner,");
       }

       let {fullname, email, password} = req.body;

       let createdOwner = await ownersModels.create({
        fullname, 
        email, 
        password,
       });
       res.status(201).send(createdOwner);
    });
};


module.exports = router;
