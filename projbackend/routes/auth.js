var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn } = require("../controllers/auth");


router.post("/signup", [
    check("name").isLength({min: 5}).withMessage("name shoould be 5 char"),
    check("email", "Email is required").isEmail(),
    check("password", "password Should be at 8 char long").isLength({min:3})

],signup);

router.post("/signin", 
[
    check("email", "Email is required").isEmail(),
    check("password", "password field is requires").isLength({min:3})

],
signin);


router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) =>{
    res.json(req.auth);
});


module.exports = router;