const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
    res.send("hello ji product")
})

module.exports = router;