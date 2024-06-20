const express = require("express");
const router = express.Router();
const onwersModel = require("../models/owners-models")

router.get("/", function(req, res){
    res.send("hello ji owner")
})

if(process.env.NODE_ENV === "development"){
    router.post("/create", function(req, res){
        res.send("hello ji owner ji")
    })

}


module.exports = router;
