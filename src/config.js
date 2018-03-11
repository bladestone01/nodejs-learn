'use strict';
/**
* practice Node.js project.
* @author junfeng chen <chengjunf2313_cn@126.com>
*/

module.exports = function(set, get, has) {
   set('web.port', 3000);

   set('web.session.secret', 'test');

   set('web.session.redis', {
     host: '127.0.0.1',
     port: 6379
   })
};
