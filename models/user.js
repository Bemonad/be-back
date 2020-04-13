const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: String,
    token: {
        type: String
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {

    const user = this;

    if (user.isModified('password')) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt);
    }

    next()
});

userSchema.methods.generateAuthToken = async function() {

    const user = this;
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_KEY, { expiresIn: '1h' });

    user.token = token;

    await user.save();

    return token
};

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email});
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
};

userSchema.statics.findByJWT = (token, fieldsReturn = '') => {
    const data = jwt.verify(token, process.env.JWT_KEY);

    return User.findOne({ _id: data._id, token: token }, fieldsReturn);
};

const User = mongoose.model('User', userSchema);


module.exports = User;
