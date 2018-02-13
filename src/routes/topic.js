'use strict';

/**
 *
 */

module.exports = function(done) {
   $.router.post('/api/topic/add', $.checkLogin, async function(req, res, next) {

      req.body.authorId = req.session.user._id;
      if ('tags' in req.body) {
          req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v => v);
      };

      const topic = await $.method('topic.add').call(req.body);
      res.apiSuccess({success: true, topic: topic});
   });

   $.router.get('/api/topic/list', async function(req, res, next) {
     if ('tags' in req.query) {
         req.query.tags = req.query.tags.split(',').map(v=>v.trim()).filter(v => v);
     };

       const list = await $.method('topic.list').call(req.query);
       res.apiSuccess({success: true, list});
   });


   $.router.post('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function(req, res, next) {
     if ('tags' in req.body) {
         req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v => v);
     };

      req.body._id = req.params.topic_id;

      await $.method('topic.update').call(req.body);
      const topic = await $.method("topic.get").call({_id: req.params.topic_id});
      console.log('post topic test:' + topic.title);
      //if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

      console.log('after post topic test:' + topic);
      res.apiSuccess({success: true, topic});
   });

   $.router.delete('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function(req, res, next) {
      const topic = await $.method('topic.delete').call({_id: req.params.topic_id});

      res.apiSuccess({success: true, topic});
   });


   $.router.get('/api/topic/item/:topic_id', async function(req, res, next) {
      const topic = await $.method('topic.get').call({_id: req.params.topic_id});
      if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

      res.apiSuccess({success: true, topic});
   });

   $.router.post('/api/topic/item/:topic_id/comment/add', $.checkLogin, async function(req, res, next) {
      req.body._id = req.params.topic_id;
      req.body.authorId = req.session.user._id;

      console.log('userid:' + req.body.authorId);
      const comment = await $.method('topic.comment.add').call(req.body);
      res.apiSuccess({success: true, comment});
   });

   $.router.delete('/api/topic/item/:topic_id/comment/delete', $.checkLogin, async function(req, res, next) {

      const comment = await $.method('topic.comment.delete').call({
          _id: req.params.topic_id,
          cid: req.body.cid,
      });
      res.apiSuccess({success: true, comment});
   });

   done();
};
