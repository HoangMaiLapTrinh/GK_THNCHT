const mongoose = require('mongoose');
const { Schema } = mongoose;

// Định nghĩa schema cho User
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Tạo model User từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;