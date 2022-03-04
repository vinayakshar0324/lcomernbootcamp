const user = require("../models/user");
const User = require("../models/user");



exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                Error: "NO User was Found in DB"
            })
        }
        req.profile = user;
        next();
    }); 
}

exports.getUser = (req, res) => {
    //TODO: get back for here for password
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    return res.json(req.profile)
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$SET: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if (err){
                return res.status(400).json({
                
                })
            }
        }
    )
}