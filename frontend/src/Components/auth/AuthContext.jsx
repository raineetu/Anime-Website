import { createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;  // Ensure that you export AuthContext here
