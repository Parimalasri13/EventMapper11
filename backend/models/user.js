// const mongoose = require('mongoose');

// // Define the User schema
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
        
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// });

// // Create the User model from the schema
// const User = mongoose.model('User', userSchema);

// module.exports = User;


const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

// Create the User model from the schema
const User = mongoose.model('Useer', userSchema);

module.exports = User;

