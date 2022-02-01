import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { renderHook, act } from '@testing-library/react-hooks';
import * as AuthSession from 'expo-auth-session';

import { AuthProvider, useAuth } from './auth';
import { not } from 'react-native-reanimated';

const userTest = {
    id: 'any_id',
    email: 'john.doe@email.com',
    name: 'John Doe',
    photo: 'any_photo.png'
};

jest.mock('expo-auth-session');

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn()
}));

describe('Auth Hook', () => {
    it('should be able to sign in with Google account existing', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(userTest));
        const mockedGoogle = jest.mocked(AuthSession.startAsync as any);

        console.log('MOCKED GOOGLE: => ', [mockedGoogle]);

        mockedGoogle.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token'
            }
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        console.table([result.current.user]);

        expect(result.current.user.email).toBe('john.doe@email.com');
    });

    it('user should not connect if cancel authentication with Google', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(userTest));
        const mockedGoogle = jest.mocked(AuthSession.startAsync);

        console.log('MOCKED GOOGLE: => ', mockedGoogle);

        mockedGoogle.mockReturnValue({
            type: 'cancel',
            params: {
                access_token: ''
            }
        } as any);

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        console.table([result.current.user]);

        expect(result.current.user).not.toHaveProperty('id');
    });

    it('should be error with incorrectly Google parameters', async () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        try {
            await act(() => result.current.signInWithGoogle());

            console.log('CORRECT: => ', result.current.user);
        } catch {
            expect(result.current.user).toEqual({});
            console.log('INCORRECT: => ', result.current.user);
        }
    });
});
