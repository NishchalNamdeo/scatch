const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModels = require("../models/product-models");
const userModels = require("../models/user-models");

router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", {error, loggedin: false})
   
})
router.get("/addtocart/:productid", isLoggedin, async function(req, res){
    try {
      let user = await userModels.findOne({email: req.user.email});
      user.cart.push(req.params.productid);
      await user.save();
      req.flash("success", "Added to cart");
      res.redirect("/shop");
    } catch (error) {
      console.error(error);
      req.flash("error", "Failed to add to cart");
      res.redirect("/shop");
    }
  });
  


  router.get("/shop", isLoggedin, async function(req, res){
    try {
      let products = await productModels.find();
      let success = req.flash("success");
      let error = req.flash("error");
      res.render("shop", { products, success, error });
    } catch (error) {
      console.error(error);
      req.flash("error", "Failed to load shop");
      res.redirect("/");
    }
  });
  

router.get("/cart", isLoggedin, async function(req, res){
    try {
        let user = await userModels.findOne({email: req.user.email}).populate("cart");

        if (!user || !user.cart || user.cart.length === 0) {
            return res.status(400).send("No items in the cart.");
        }

        const bill = (Number(user.cart[0].price) + 20) - Number(user.cart[0].discount);
        res.render("cart", {user, bill});
    } catch (error) {
        req.flash("error", "something went wrong")
        res.redirect("/shop");
    }
});


module.exports  = router;