const mongoose = require('mongoose');
const Comment = require('../models/comment');

const handleCommentRoutes = async (req, res, parsedUrl) => {
    const path = parsedUrl.pathname;
    const method = req.method;
    const id = path.split('/')[2];

    res.setHeader('Content-Type', 'application/json');

    if (path === '/comments' && method === 'GET') {
        try {
            const comments = await Comment.find();
            res.writeHead(200);
            res.end(JSON.stringify(comments));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    } else if (path.startsWith('/comments/') && method === 'GET') {
        try {
            const comment = await Comment.findById(id);
            if (!comment) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'Comment not found' }));
            }
            res.writeHead(200);
            res.end(JSON.stringify(comment));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    } else if (path === '/comments' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { content, author } = JSON.parse(body);
                const newComment = new Comment({ content, author });
                await newComment.save();
                res.writeHead(201);
                res.end(JSON.stringify(newComment));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal server error' }));
            }
        });
    } else if (path.startsWith('/comments/') && method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { content, author } = JSON.parse(body);
                const updatedComment = await Comment.findByIdAndUpdate(id, { content, author }, { new: true });
                if (!updatedComment) {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ message: 'Comment not found' }));
                }
                res.writeHead(200);
                res.end(JSON.stringify(updatedComment));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ message: 'Internal server error' }));
            }
        });
    } else if (path.startsWith('/comments/') && method === 'DELETE') {
        try {
            const deletedComment = await Comment.findByIdAndDelete(id);
            if (!deletedComment) {
                res.writeHead(404);
                return res.end(JSON.stringify({ message: 'Comment not found' }));
            }
            res.writeHead(200);
            res.end(JSON.stringify(deletedComment));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

module.exports = handleCommentRoutes;