'use strict';
/**
 * practice Node.js project.
 * @author junfeng chen <chengjunf2313_cn@126.com>
 */

import ProjectCore from 'project-core';

const $ = global.$ = new ProjectCore();


//load the configuration file
$.init.add((done) => {
   $.config.load(path.resolve(__dirname, 'config.js'));

   const env = process.NODE_ENV || null;
   if (env) {
      $.config.load(path.resolve(__dirname, '../config', env + ".js"));
   }

   $.env = env;
});


//initialization
$.init((err) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  } else {
    console.log("inited");
  }
});
