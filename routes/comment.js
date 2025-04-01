const express = require('express');
const router = express.Router();
const Comment = require('../models/comment'); 

// Lấy danh sách tất cả bình luận
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Lấy thông tin của một bình luận cụ thể
router.get('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Thêm một bình luận mới
router.post('/comments', async (req, res) => {
    try {
        const { content, author } = req.body;
        const newComment = new Comment({ content, author });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Cập nhật một bình luận
router.put('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content, author } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            id, 
            { content, author }, 
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Xóa một bình luận
router.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(deletedComment);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
