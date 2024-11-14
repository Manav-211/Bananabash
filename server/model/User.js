const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, default: 0 }, // Stores the latest score directly
    highestScore: { type: Number, default: 0 } // Stores the highest score
});

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;