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
                    res.send("user created suceesfully");

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
    if (!user) return res.send("email password incorrect");

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("you can login")
        } else {
            return res.send("email password incorrect");
        }
    })

};

module.exports.logout = async function (req, res) {
    res.cookie("token", "");
    return res.redirect("/");
};