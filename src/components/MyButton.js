import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {THEME} from "../utilities/theme";

export const MyButton = ({onPress, text, style, color = THEME.secondary}) => {
    return (
        <TouchableOpacity
            style={{...styles.btnWrapper, ...style, backgroundColor: color}}
            onPress={onPress}
        >
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18
    }
})