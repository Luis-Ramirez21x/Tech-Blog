const router = require('express').Router();
const { User, Blog, Comment} = require('../models');
const withAuth = require('../utils/auth');

//home page showing all blogs
router.get('/', /*withAuth,*/ async (req, res) => {
    try {
      const blogData = await Blog.findAll();

      const blogs = blogData.map ((blog) => blog.get( {plain:true} ));

      res.render('homepage', {blogs});
     
    } catch (err) {
      res.status(500).json(err);
    }
  });

//dashboard route
router.get('/dashboard', /*withAuth,*/ async (req, res) => {
  try {
    const blogData = await Blog.findAll({ where: {user_id : req.session.user_id} });

    const blogs = blogData.map ((blog) => blog.get( {plain:true} ));

    res.render('dashboard', {blogs});
   
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new blog form view
router.get('/newBlog', (req,res) => {
  try{
    res.render('createBlog');
  } catch (err) {
    res.status(500).json(err);
}});

//comment on a blog view
router.get('/blog/:id', async (req,res) => {
  try{
    //creating a blog_id from params
    req.session.reload(() => {
      req.session.blog_id = req.params.id;
      });

    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plain: true });

    const commentData = await Comment.findAll( {
      include:[
        {
        model:User,
        attributes:['name'],
      },
      ],
      where: {blog_id :req.session.blog_id},
       
    });
    const comments = commentData.map((comment) => comment.get({ plain:true }));
    console.log(comments);

    res.render('commentOnBlog', { blog, comments });

  } catch (err) {
      res.status(500).json(err);
    }
})

  router.get('/login', (req, res) => {
    //if logged in send to hompage route
    if (req.session.logged_in) {
      console.log("logged in *************");
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  module.exports = router;