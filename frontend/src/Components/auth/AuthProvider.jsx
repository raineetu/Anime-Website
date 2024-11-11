import React, { useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';  // Add this import to avoid the "AuthContext is not defined" error

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Update login to include role and log data for debugging
    const login = async (userDetails) => {
        const { email, password, role } = userDetails;
    
        console.log('Login Request Data:', { email, password, role }); // Log to verify contents
    
        if (!email || !password || !role) {
            console.error('Missing required fields: email, password, and role');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8001/user/login', { email, password, role });
            const userToStore = response.data.user;
    
            console.log('Login Successful. User Data:', userToStore);
    
            setUser(userToStore);
            localStorage.setItem('user', JSON.stringify(userToStore));
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };
    

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
