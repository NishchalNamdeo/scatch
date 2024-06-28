const userModels = require("../models/user-models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/genrateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModels.findOne({ email: email })

        if (user) return res.status(401).send("you already have an account, please login.")

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModels.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.redirect("/");

                }
            });
        });
    } catch (err) {
        res.send(err.message);
    }

}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModels.findOne({ email: email });
    if (!user){ req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop")
        } else {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
    })

};

module.exports.logout = async function (req, res) {
    res.cookie("token", "");
    return res.redirect("/");
};