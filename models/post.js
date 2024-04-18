import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const postSchema = new Schema({
  title: String,
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema]
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}
