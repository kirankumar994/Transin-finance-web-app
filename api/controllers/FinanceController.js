module.exports = {

    Addfinance : function(req, res, next){
        Finance.create(req.params.all()).exec(function(err, finance){
            if (err) {
                    res.send(500, {error: "DB Error"});
                } else {
                    console.log(finance);
                    res.json(finance);
                }
        })
    },

     logout: function(req, res) {
        req.logout();
        res.redirect('/test');
    }
};