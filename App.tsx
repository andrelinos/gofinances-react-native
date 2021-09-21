import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme';
import { Dashbard } from './src/screens/Dashboard';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Dashbard />
        </ThemeProvider>
    );
}
