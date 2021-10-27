import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

import theme from './src/global/styles/theme';

import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
    const [fontsLoad] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoad) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <ThemeProvider theme={theme}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={theme.colors.primary}
                    />
                    <AuthProvider>
                        <SignIn />
                    </AuthProvider>
                    <View style={{ paddingBottom: getBottomSpace() }} />
                </ThemeProvider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}
