var bcrypt = require('bcrypt');

function hashPassword(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        values.password = hash;
        next();
    });
}

module.exports = {
    attributes: {
          email: {
            type: 'email',
            required: true,
            unique: true
        },
        
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};