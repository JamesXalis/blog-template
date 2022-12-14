const router = require("express").Router();
const {User, Post, Comment} = require("../../../models")

// routes "/api/blogpost"
router.get('/', async (req,res)=> {
    let postData = await Post.findAll({
        include: [{
            model: Comment,
            include : [{model: User}]
        }]
    });
    let posts = postData.map((post) => post.get({plain: true}));
    res.status(200).json(posts);
})

router.get('/:id', async (req,res)=> {
    let postData = await Post.findOne({
        include: [{
            model: Comment,
            include : [{model: User}]
        }],
        where: {
            id: req.params.id
        }
    })
});

router.get('/:id', async (req,res)=> {
    let postData = await Post.findOne({
        include: [{model: Comment}],
        where: {
            id: req.params.id
        }
    });
    if (!postData) return res.status(404).json("post not found");
    let user = postData.get({plain: true});
    res.status(200).json(user);
})

router.post('/', async (req,res) => {
    if (!req.session.id) {
        res.redirect('/login');
    }
    try {
        let post = req.body;
        post.user_id = req.session.user_id;
        console.log(post);
        let postedPost = await Post.create(post);
        res.status(200).json(postedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req,res) => {
    try {
        let updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!updatePost[0]) return res.status(404).json("post not found");
        res.status(200).json(updatePost);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        let deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletedPost) return res.status(404).json("post not found");
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;