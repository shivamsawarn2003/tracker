const mongoose = require('mongoose');

// Define the schema for the user
const UserSchema = new mongoose.Schema({ // Corrected to UserSchema
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const db1Connection = mongoose.createConnection(process.env.MONGO_CONN, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
});

const UserModel = db1Connection.model('users', UserSchema);

module.exports = UserModel;
