const express = require("express");
const userModels = require("../models/user-models");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", function(req, res){
    res.send("hello ji user")
})


router.post("/register", async function(req, res){
    try{
       let {email, password, fullname } = req.body;
       bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
            if(err) return res.send(err.message);
            else res.send(hash);
        })
       })
       let user =  await userModels.create({
          email,
          password,
          fullname,
        });
        res.send(user);
    }catch(err){
        res.send(err.message);
    }

});


module.exports = router;