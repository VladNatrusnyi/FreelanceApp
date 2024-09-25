import {Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";

export const AdditionalBtnAuth = ({text, onPress, style, reverse = false}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper ,style, {flexDirection: reverse ? 'row-reverse' : 'row'}]}>
            <Text style={styles.text}>{text}</Text>
            <AntDesign name={!reverse ? 'arrowright' : 'arrowleft'} size={24} color={THEME.lightBg} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: THEME.secondary,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: THEME.lightBg
    },
    text: {
       color: THEME.lightBg,
        fontSize: 16
    },
});