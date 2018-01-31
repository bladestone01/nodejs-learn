'use strict';
/**
 * practice Node.js project.
 * @author junfeng chen <chengjunf2313_cn@126.com>
 */
import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();


//load the configuration file
$.init.add((done) => {
   $.config.load(path.resolve(__dirname, 'config.js'));

   const env = process.env.NODE_ENV || null;
   if (env) {
      $.config.load(path.resolve(__dirname, '../config', env + ".js"));
   }

   $.env = env;

   //callabckfunction
   done();
});

$.createDebug = function(name) {
    return createDebug("test1:" + name);
};
const debug = $.createDebug('server');

//init the mongodb
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));

//init the mongodb model
$.init.load(path.resolve(__dirname, 'models'));


// init the express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));
$.init.load(path.resolve(__dirname, 'routes'));

//initialization
$.init((err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log("inited: [env=:%s]", $.env);
  }

  const item = new $.model.User({
     name: `User${$.utils.date('YmdHis')}`,
     password: '123456',
     nickname: 'test user'
  });
  item.save(console.log);

  debug("test in server.js");
});
