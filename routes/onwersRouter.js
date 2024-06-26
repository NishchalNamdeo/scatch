const express = require("express");
const router = express.Router();
const onwersModel = require("../models/owners-models")

router.get("/admin", function (req, res) {
   let success =  req.flash("success");
    res.render("createProducts", { success });
})

if (process.env.NODE_ENV === "development") {
    router.post("/create", function (req, res) {
        res.send("hello ji owner ji")
    })

}


module.exports = router;
