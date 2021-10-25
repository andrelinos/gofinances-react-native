import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as AuthSession from 'expo-auth-session';

import {
    GOOGLE_AUTH_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_RESPONSE_URL,
    EXPO_REDIRECT_URI,
    GOOGLE_RESPONSE_TYPE,
    GOOGLE_SCOPE,
    GOOGLE_RESPONSE_ALT
} from 'react-native-dotenv';

interface AuthProviderProps {
    children: ReactNode;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    photo?: string;
    locale?: string;
    verified_email?: boolean;
}

interface IAuthContextData {
    user: UserProps;
    signInWithGoogle: () => Promise<void>;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);

    async function signInWithGoogle() {
        try {
            const AUTH_URL = `${GOOGLE_AUTH_URL}?`;
            const CLIENT_ID = `client_id=${GOOGLE_CLIENT_ID}`;
            const REDIRECT_URI = `&redirect_uri=${EXPO_REDIRECT_URI}`;
            const RESPONSE_TYPE = `&response_type=${GOOGLE_RESPONSE_TYPE}`;
            const SCOPE = `&scope=${encodeURI(GOOGLE_SCOPE)}`;

            const authUrl = `${AUTH_URL}${CLIENT_ID}${REDIRECT_URI}${RESPONSE_TYPE}${SCOPE}`;

            console.log(authUrl);

            const { params, type } = (await AuthSession.startAsync({
                authUrl
            })) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(
                    `${GOOGLE_AUTH_RESPONSE_URL}?alt=${GOOGLE_RESPONSE_ALT}&access_token=${params.access_token}`
                );
                const userInfo = await response.json();
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture,
                    locale: userInfo.locale,
                    verified_email: userInfo.verified_email
                });
            }
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
