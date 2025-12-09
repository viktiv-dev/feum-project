const userService = require('../services/userService');

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body);
        res.status(200).json({message: 'User was created'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await userService.loginUser(email, password);
        const { password: pw, ...userData } = user.toJSON();

        res.status(200).json({ message: 'Login successful', user: userData });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    loginUser
}