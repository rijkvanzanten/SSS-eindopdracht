var express = require('express'),
    router  = express.Router();

router.get('/user/:username', function(req, res, next) {
    
    req.getConnection(function(err, connection) {
        
        if(err) {
            res.locals.err = err;
            return next();
        } 
        
        connection.query("SELECT name, profile_pic_path, bio, username FROM users WHERE username = ?", [req.params.username], function(err, record) {
            
            if(err) {
                res.locals.err = err;
                return next();
            } 
               
            if(record.length) {
                
                res.locals.title = record[0].name + ' (@' + record[0].username + ') • SSS';
                res.locals.user = record[0];
                res.render('user');
                
            } else {
                
                res.send('niet gevonden');
                
            }

        });
    });
    
}, function(req, res) {
    console.log(res.locals.err);
    res.status(500);
    res.send('hij is stuk');
});

module.exports = router;