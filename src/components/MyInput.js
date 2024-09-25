
import {TextInput, View, StyleSheet, TouchableOpacity, Animated, Easing} from "react-native";
import {THEME} from "../utilities/theme";
import {useRef, useState} from "react";

export const MyInput = (
    {
        value,
        onChange,
        placeholder,
        icon = null,
        isError = '',
        needBorder = false
    }) => {

    const [isOnFocus, setIsOnFocus] = useState(false)

    const iconTranslateX = useRef(new Animated.Value(-30)).current;

    const handleFocus = () => {
        setIsOnFocus(true);
        Animated.timing(iconTranslateX, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        if (!value.trim()) {
            Animated.timing(iconTranslateX, {
                toValue: -30,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start(() => setIsOnFocus(false));
        }
    };

    return (
        <View style={{...styles.container, borderColor: isError ? 'red' : isOnFocus ? THEME.secondary : needBorder ? 'lightgray' : THEME.lightBg}}>
            {
                isOnFocus ?
                <Animated.View style={{ transform: [{ translateX: iconTranslateX }] }}>
                    {icon}
                </Animated.View>
                    : null
            }

            <TextInput
                placeholderTextColor={THEME.grayText}
                style={styles.inputStyle}
                placeholder={placeholder}
                value={value}
                autoCapitalize={'none'}
                onChangeText={(text) => onChange(text)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        borderWidth: 2,
        backgroundColor: THEME.lightBg,
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%'
    },

    inputStyle: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontSize: 18,
        color: THEME.secondary
    },
});