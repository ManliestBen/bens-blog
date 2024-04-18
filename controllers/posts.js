import { Post } from "../models/post.js"

function newPost(req, res) {
  res.render('posts/new', {
    title: 'Add Post'
  })
}

function create(req, res) {
  // identify the author of the post
  req.body.author = req.user.profile._id
  // create the post with form data (req.body)
  Post.create(req.body)
  .then(post => {
    // redirect to posts index view
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

// function show(req, res) {
//   Profile.find(req.params.profileId)
//   .then(profile => {
//     Post.find({author: profile._id})
//     .populate('author')
//     .then(posts => {

//     })
//   })
// }

function index(req, res) {
  Post.find({})
  .populate('author')
  .then(posts => {
    console.log(posts)
    res.render('posts/index', {
      title: 'All Posts',
      posts: posts
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deletePost(req, res) {
  Post.findByIdAndDelete(req.params.postId)
  .then(post => {
    res.redirect('/posts')
  })
}

export {
  newPost as new,
  create,
  index,
  deletePost as delete
}