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

function show(req, res) {
  Post.findById(req.params.postId)
  .populate('author')
  .populate('comments.author')
  .then(post => {
    res.render('posts/show' ,{
      title: 'Post Details',
      post
    })
  })
}

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
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    req.body.author = req.user.profile._id
    post.comments.push(req.body)
    post.save()
    .then(()=> {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteComment(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    post.comments.remove({_id: req.params.commentId})
    post.save()
    .then(() => {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newPost as new,
  create,
  index,
  deletePost as delete,
  show,
  addComment,
  deleteComment
}