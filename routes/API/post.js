const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../Middleware/Auth');
const Profile = require('../../models/Profiles');
const User = require('../../models/User');
const Post = require('../../models/Posts');
const router = express.Router();

// @route   POST api/post
// @desc    create a post
// @access  Private
router.post('/', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   Get api/post
// @desc    get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/post/:id
// @desc    get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Delete api/post/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    // Check if post exists
    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check if user is authorized to delete the post
    // If the user is not authorized, return an error response
    //check user
    if (posts.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // Remove post
    await posts.deleteOne();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   put api/post/like/:id
// @desc    like a Post
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check if the post is already liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    // Add user id to likes array
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   put api/post/Unlike/:id
// @desc    like a Post
// @access  Private

router.put('/Unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check if the post is already liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post has not Yet been Liked' });
    }
    // Remove user id from likes array
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    // Save the post
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/post/comment/:id
// @desc    comment on a post
// @access  Private
router.post('/comment/:id', [auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Delete api/post/comment/:id/:comment_id
// @desc    delete comment on a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check if comment exists
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check if user is authorized to delete the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // Remove comment
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
