const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const newUser = new User({ name, email, password })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password } = req.body
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(deletedUser)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

module.exports = router;



