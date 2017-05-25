var passport = require('passport');
module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        var email = req.params.all().email;
        var password = req.params.all().password;

        User.findOne({email:email}).exec(function(err, user){
            console.log(user);
            if(user.password==password){
                res.redirect('/financecreate');
            } else {
                res.send("Invalid email or password")
            }
        })
    

        passport.authenticate('local', function(err, user, info) {
            console.log(err);
            console.log(user);
            console.log(info);
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                res.redirect('/financecreate');
                /*return res.send({
                    message: info.message,
                    user: user
                });*/
            });

        })

    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/test');
    }
};