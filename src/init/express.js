'use strict';

/**
 *
 */
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multipart from 'connect-multipart';

module.exports = function(done) {
    const app = new express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(multipart());

    const router = express.Router();
    const router = express.Router();

  const routerWrap = {};
  ['get', 'head', 'post', 'put', 'del', 'delete'].forEach(method => {
    routerWrap[method] = function (path, ...fnList) {
      fnList = fnList.map(fn => {
        return function (req, res, next) {
          const ret = fn(req, res, next);
          if (ret && ret.catch) ret.catch(next);
        };
      });
      router[method](path, ...fnList);
    };
  });
  $.router = routerWrap;

    app.use(router);
    app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

    app.listen($.config.get('web.port'), (err) => {
        done(err);
    });
};
