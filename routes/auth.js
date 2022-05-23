var express = require("express");
var router = express.Router();
const {
    authenticateToken
} = require("../helpers/authenticate-JWT")

const {
    signUp
} = require("../controllers/auth");
const {
    registerValidator,
    checkValidator,
} = require("../middlewares/userValidate");

router.post("/register", registerValidator, checkValidator, signUp);

router.get("/me", async (req, res) => {
    // Get user access token from headers
    const token = req.headers['x-api-key'];
    // Decode user data from token
    const payload = await authenticateToken(token);
    if (payload == null || payload == undefined) {
        res.status(404).json({
            error: "Couldn't get user data from token, payload null or undefined",
            payload: payload
        })
    } else {
        // Send user data as response
        res.status(200).json(payload)
    }

});

module.exports = router;