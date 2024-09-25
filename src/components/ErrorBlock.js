import {StyleSheet, Text, View} from "react-native";

export const ErrorBlock = ({text}) => {
    return (
        <View style={{...styles.wrapper, paddingVertical: text ? 10: 0,}}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%'
    },
    text: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16
    }
})
