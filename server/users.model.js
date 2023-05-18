const mongoose = require('mongoose');

// Define a schema and model
const usersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
  }, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}, 
    timestamps: true
});

const usersModel = mongoose.model('Users', usersSchema);

module.exports = usersModel;