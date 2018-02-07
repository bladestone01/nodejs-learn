'use strict';

/**
 *
 */
module.exports = function(done) {
   //$.method('user.add').call({
      // name : 'hello1',
      // email : 'xxx@qq.com',
      // password: '1111',
      //nickname: 'test 1',
      //about: 'what it is'
  // }, console.log);
/*
  $.method('user.get').call({
     name: 'hello1',

  }, console.log);
  */

  $.method('user.update').call({
     name : 'hello1',
     nickname: 'lao lei',
     
  }, console.log);
};
