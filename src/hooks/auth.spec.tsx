import React from 'react';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from './auth';

describe('Auth Hook', () => {
    it('should be able to signin in whit Google account existing', () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
        });
        console.log(result);
    });
});
