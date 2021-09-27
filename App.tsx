import React from 'react';
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

import { SafeAreaView } from './src/global/styles/styles';
import { Register } from './src/screens/Register';
import theme from './src/global/styles/theme';

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
        <SafeAreaView>
            <ThemeProvider theme={theme}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.colors.primary}
                />
                <Register />
                <View style={{ paddingBottom: getBottomSpace() }} />
            </ThemeProvider>
        </SafeAreaView>
    );
}
