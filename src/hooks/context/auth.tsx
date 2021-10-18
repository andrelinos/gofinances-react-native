import React, { createContext, ReactNode, useContext } from 'react';

import * as AuthSession from 'expo-auth-session';

import {
    REACT_NATIVE_AUTH_URL,
    REACT_NATIVE_CLIENT_ID,
    REACT_NATIVE_REDIRECT_URL,
    REACT_NATIVE_RESPONSE_TYPE,
    REACT_NATIVE_SCOPE
} from 'react-native-dotenv';

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const user = {
        id: '3545646456',
        name: 'John',
        email: 'john@example.com'
    };

    async function signInWithGoogle() {
        try {
            const AUTH_URL = `${REACT_NATIVE_AUTH_URL}?`;
            const CLIENT_ID = `client_id=${REACT_NATIVE_CLIENT_ID}`;
            const REDIRECT_URL = `&redirect_uri=${REACT_NATIVE_REDIRECT_URL}`;
            const RESPONSE_TYPE = `&response_type=${REACT_NATIVE_RESPONSE_TYPE}`;
            const SCOPE = `&scope=${encodeURI(REACT_NATIVE_SCOPE)}`;

            const authUrl = `${AUTH_URL}${CLIENT_ID}${REDIRECT_URL}${RESPONSE_TYPE}${SCOPE}`;

            console.log(authUrl);

            const response = await AuthSession.startAsync({ authUrl });

            console.log(response);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
