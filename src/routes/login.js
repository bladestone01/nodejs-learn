'use strict';
module.exports = function(done) {
   $.route.post("/user/login", async function(req, res, next) {
     try{
      if (!user) return next(new Error(" user does not exist"));

      if (!$.utils.validatePassword(req.body.password, user.password)) {
        return next(new Error('incorrect password'));
      }

      res.json({success: true});
    } catch (err) {
      next(err);
    }
   });

   $.route.post('/api/logout', async function(req, res, next){

   });

   $.route.post('/api/signup', async function(req, res, next){

   });
};
