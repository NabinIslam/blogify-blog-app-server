const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    author: {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;
