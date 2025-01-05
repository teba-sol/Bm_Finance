const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },


    balance: { type: Number, default: 0 },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10); 
        next(); 
    } catch (error) {
        next(error); 
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('my_users', UserSchema);

module.exports = { UserModel };


