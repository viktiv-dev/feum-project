const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const SALT_ROUNDS = 10;

async function createUser(data) {
    const { email, password, username } = data;
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
        id: uuidv4(),
        email,
        password: hashedPass,
        username
    });

    return user;
}

async function loginUser(email, password) {
    const user = await User.findOne({where: {email}})
    if(!user) {
        throw new Error('Invalid email or password')
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if(!isCorrect) {
        throw new Error('Invalid email or password')
    }
    return user;
}

module.exports = {
    createUser,
    loginUser
}