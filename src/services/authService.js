import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generateAuthToken } from '../utils/tokenUtils.js';

export default {
    async register(userData) {
        try {
            const user = await User.create(userData);

            const token = generateAuthToken(user);

            return { success: true, token };
        } catch (error) {
            if (error.code === 11000) {
                return { success: false, error: 'Email already exists' };
            }
            if (error.name === 'ValidationError') {
                return { success: false, error: 'Please fill in all required fields' };
            }
            return { success: false, error: 'Registration failed. Please try again.' };
        }
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return { success: false, error: 'Invalid email or password' };
        }

        const token = generateAuthToken(user);

        return { success: true, token };
    }
}