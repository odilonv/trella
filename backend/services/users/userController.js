import { UserService } from './userService.js';

export const IdUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body.user;
    try {
        const newUser = await UserService.createUser(firstName, lastName, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body.user;
    try {
        const user = await UserService.loginUser(email, password);
        if (user) {
            req.session.user = user;
            res.json(user);
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const sessionUser = (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'User not logged in' });
    }
};

export const updateUser = (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    const updatedUser = UserService.updateUser(userId, username, email);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

export const deleteUser = async (req, res) => {
    const { userId, password } = req.body;
    console.log("BACK ID:", userId);
    try {
        const success = await UserService.deleteUser(userId, password);
        console.log(success);
        if (success) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
