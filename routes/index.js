const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModels = require("../models/product-models");

router.get("/", function(req, res){
    let error = req.flash("errror");
    res.render("index", {error})
})

router.get("/shop", isLoggedin, async function(req, res){
   let products =  await productModels.find();
   res.render("shop", { products });

})

router.get("/logout", isLoggedin, function(req, res){
    res.render("shop");
})


module.exports  = router;