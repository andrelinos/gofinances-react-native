import { jest } from '@jest/globals';
import { renderHook, act, RenderResult } from '@testing-library/react-hooks';
import * as AuthSession from 'expo-auth-session';

import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session');

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(),
//     setItem: jest.fn()
// }));

let hookResult: RenderResult<ReturnType<typeof useAuth>>;
let googleMocked: any;

describe('Auth Hook', () => {
    beforeEach(() => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });
        hookResult = result;
        googleMocked = jest.mock(AuthSession.startAsync as any);
    });

    it('should be able to sign in with Google account existing', async () => {
        googleMocked.mockReturnValueOnce({
            type: 'success',
            accessToken: 'accessToken',
            idToken: 'idToken',
            user: {
                id: 'userId',
                email: 'john.doe@email.com',
                name: 'John',
                photo: 'any_photo.png'
            }
        });

        // await act(() => hookResult.current.signInWithGoogle());

        // expect(hookResult.current.user.email).toBe('john.doe@email.com');
    });
    // it('should be able to sign in with Google account existing', async () => {
    //     fetchMock.mockResponseOnce(JSON.stringify(userTest));
    //     const mockedGoogle = jest.mocked(AuthSession.startAsync as any);

    //     console.log('MOCKED GOOGLE: => ', [mockedGoogle]);

    //     mockedGoogle.mockReturnValueOnce({
    //         type: 'success',
    //         params: {
    //             access_token: 'any_token'
    //         }
    //     });

    //     const { result } = renderHook(() => useAuth(), {
    //         wrapper: AuthProvider
    //     });

    //     await act(() => result.current.signInWithGoogle());

    //     console.table([result.current.user]);

    //     expect(result.current.user.email).toBe('john.doe@email.com');
    // });

    // it('user should not connect if cancel authentication with Google', async () => {
    //     googleMocked.mockReturnValueOnce({
    //         type: 'canceled',
    //         accessToken: ''
    //     });

    //     await act(() => hookResult.current.signInWithGoogle());

    //     console.table([hookResult.current.user]);

    //     expect(hookResult.current.user).not.toHaveProperty('id');
    // });

    // it('should be error with incorrectly Google parameters', async () => {
    //     const { result } = renderHook(() => useAuth(), {
    //         wrapper: AuthProvider
    //     });

    //     try {
    //         await act(() => result.current.signInWithGoogle());

    //         console.log('CORRECT: => ', result.current.user);
    //     } catch {
    //         expect(result.current.user).toEqual({});
    //         console.log('INCORRECT: => ', result.current.user);
    //     }
    // });
});
