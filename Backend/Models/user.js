const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_I = 10;

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})

userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash( user.password, salt, function(err, hash) {
                if(err) return next(err);

                user.password = hash;
                next();
            } )
        })
    }
    else{
        next();
    }

});

userSchema.methods.comparePassword = function(cPassword, cb) {
    bcrypt.compare(cPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

const User = mongoose.model("users", userSchema);

module.exports = { User }
