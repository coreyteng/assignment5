import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export function NoteDetail(props: any) {
    const passProps = props.route.params.passProps || 'nothing get'
    return (
        <View style={styles.container}>
            <Text>NoteDetailScreen</Text>
            <Text>{passProps.note}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
