'use strict';

/**
 *
 */

module.exports = function(done) {
   $.router.get('/', function(req, res, next) {
      res.end(`Now 北京时间：${new Date()}`);
   });

   done();
};
