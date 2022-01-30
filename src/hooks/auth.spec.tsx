import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-auth-session', () => {
    return {
        startAsync: () => {
            return {
                type: 'success',
                params: {
                    access_token: 'google-token'
                }
            };
        }
    };
});

fetchMock.enableMocks();

describe('Auth Hook', () => {
    beforeEach(async () => {
        const useCollectionKey = '@GoFinances:user';
        await AsyncStorage.removeItem(useCollectionKey);
    });

    it('should be able to signin in whit Google account existing', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        id: 'userInfo.id',
                        email: 'userInfo.email',
                        name: 'userInfo.name',
                        photo: 'userInfo.photo',
                        locale: 'userInfo.locale',
                        verified_email: 'userInfo.verified_email'
                    })
            })
        ) as jest.Mock;
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email).toBe('userInfo.email');
    });
});
