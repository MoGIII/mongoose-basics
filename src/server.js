const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = '';
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

});

app.get('/post', (req,res)=>{

});

app.get('/post/:id',(req,res)=>{

});

app.put('/post/:id',(req,res)=>{

});

app.delete('/post/:id',(req,res)=>{

});

function listen() {
    app.listen(port,()=>{
        console.log(`Listening on http://localhost:${port}`);
    });
}

function connect(url) {
    mongoose.connect(`mongodb://localhost:27017/${url}`);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('MongoDB Connected!');
        listen();
    });
}

connect(db);