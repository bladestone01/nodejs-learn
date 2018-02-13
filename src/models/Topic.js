'use strict';

/**
 *
 */
import mongoose from 'mongoose';

module.exports = function(done) {
   const Schema = mongoose.Schema;

   const ObjectId = Schema.ObjectId;
   const Topic = new Schema({
       authorId: {type:ObjectId, index:true, required: true},
       title: {type: String, trim: true, required:true},
       content: {type: String, index: true, required:true},
       tags: [{type: String, index: true}],
       createdAt: {type: Date, index: true},
       updatedAt: {type:Date, index: true},
       lastCommentedAt: {type: Date, index: true},
       comments: [{
            cid: ObjectId,
            authorId: ObjectId,
            content: String,
            createdAt: Date,
       }]
   });

   $.mongodb.model('Topic', Topic);
   $.model.Topic = $.mongodb.model('Topic');

   done();
};
