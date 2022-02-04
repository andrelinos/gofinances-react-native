import React from 'react';

import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
    return (
        <View>
            <Text testID="title-profile">Profile</Text>
            <TextInput
                testID="input-name"
                placeholder="Nome"
                autoCorrect={false}
                value="John"
            />
            <TextInput
                testID="input-surname"
                placeholder="Sobrenome"
                autoCorrect={false}
                value="Doe"
            />
            <Button testID="button-title" title="Salvar" onPress={() => {}} />
        </View>
    );
}
