const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true
    },
    content: String,
    createdDate: {
        type: Date,
        default: ()=> new Date()
    }
});

app.post('/post', (req,res)=>{
    const post = new Post(req.body);
    post.save()
    .then((newPost)=>{
        res.status(201).send(newPost);
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).send(err);
    });
});

app.get('/post', (req,res)=>{
    Post.find()
    .then((posts)=> res.status(200).send(posts))
    .catch(()=> res.sendStatus(500));
});

app.get('/post/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(post => res.status(200).send(post))
    .catch(() => res.sendStatus(500));
});

app.put('/post/:id',(req,res)=>{
    Post.findByIdAndUpdate(req.params.id, req.body)
    .then((updatedPost) => {
        if (!updatedPost) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(updatedPost);
    })
    .catch((err) => res.status(400).send(err));
});

app.delete('/post/:id',(req,res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
        if (!deletedPost) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    })
    .catch(() => res.sendStatus(500));
});

function listen() {
    app.listen(port,()=>{
        console.log(`Listening on http://localhost:${port}`);
    });
}

function connect() {
    mongoose.connect('mongodb://localhost:27017/pinterest');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('MongoDB Connected!');
        listen();
    });
}

connect();