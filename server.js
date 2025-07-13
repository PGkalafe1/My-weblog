const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// اتصال به MongoDB
mongoose.connect('mongodb://localhost:27017/myblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// مدل پست
const Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    excerpt: String,
    content: String,
    image: String
}));

// Routes
// دریافت تمام پست‌ها
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ایجاد پست جدید
app.post('/api/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        excerpt: req.body.excerpt,
        content: req.body.content,
        image: req.body.image
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// دریافت یک پست خاص
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route برای صفحه اصلی
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// شروع سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});