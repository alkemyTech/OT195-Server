const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const {User} = require("../models/user");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 120 * 1000, //2 minutes
    max: 5,
    message: "Many requests, please try again later",
});

router.use(limiter)

router.post('/auth/login', async(req, res)=> {
    const {email, password} = req.body;

    const dbUser = await User.findOne({
        where:{email, password}
    })

    if(dbUser){
        const token = jwt.sign(
            {
                id: dbUser.id,
                roleId: dbUser.roleId
            },
            JWT_SECRET,
            {expiresIn: "24h"}
        );
        res.status(200).json(token);
    }else{
        res.status(401).json("Invalid email or password. Please, try again.")
    }
});

module.exports = router;