import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';

import { Routes } from './src/routes';
import theme from './src/global/styles/theme';

import { AuthProvider, useAuth } from './src/hooks/auth';

export default function App() {
    const [fontsLoad] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    const { userStorageLoading } = useAuth();

    if (!fontsLoad || userStorageLoading) {
        return <AppLoading />;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.colors.primary}
                />
                <AuthProvider>
                    <Routes />
                </AuthProvider>
                <View style={{ paddingBottom: getBottomSpace() }} />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
