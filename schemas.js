const joi = require("joi");

module.exports.postSchema = joi.object({
    description: joi.string().required(),
}).required();

module.exports.commentSchema = joi.object({
    rating:joi.string().required(),
    comment: joi.string().required(),
}).required();