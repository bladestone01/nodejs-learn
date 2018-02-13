'use strict';

module.exports = function(done) {
  $.checkLogin = function(req,res, next) {
      if (!(req.session.user && req.session.user._id)) return next(new Error('please login first'));

      next();
  };

  $.checkTopicAuthor = async function(req, res, next) {
      const topic = await $.method('topic.get').call({_id: req.params.topic_id});

      if (!topic) next(new Error(`topic ${req.params.topic_id} does not exists`));

      console.log('I ma not null in topic');
      if (topic.authorId.toString() != req.session.user._id.toString()) {
          return next(new Error('access denied'));
      };

      console.log('after topic author checking....');

      req.topic = topic;

      next();
  };

   done();
};
