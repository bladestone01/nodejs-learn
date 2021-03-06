'use strict';

/**
 *
 */
module.exports = function(done) {
   $.router.get("/api/login_user", async function(req, res, next) {
       res.apiSuccess({user: req.session.user, token:req.session.logout_token});
   });
   $.router.post("/api/login", async function(req, res, next) {
       if (!req.body.password) return next(new Error("missing password"));
       const user = await $.method('user.get').call(req.body);
      if (!user) return next(new Error(" user does not exist"));

      if (!$.utils.validatePassword(req.body.password, user.password)) {
        return next(new Error('incorrect password'));
      }

      req.session.user = user;
      req.session.logout_token = $.utils.randomString(20);

      res.apiSuccess({success: true, token: req.session.logout_token});
   });

   $.router.post('/api/logout', async function(req, res, next){
      console.log('req.token:' + req.body.token);
       if (req.session.logout_token && (req.body.token != req.session.logout_token)) {
          return next(new Error("invalid token"));
       }

       delete req.session.logout_token;
       delete req.session.user;

       res.apiSuccess({success: true});
   });

   $.router.post('/api/signup', async function(req, res, next){
      const user = await $.method('user.add').call(req.body);


      res.apiSuccess({user: user});
   });

   done();
};
