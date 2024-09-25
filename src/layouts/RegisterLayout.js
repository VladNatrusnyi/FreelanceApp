import {LinearGradient} from "expo-linear-gradient";
import {THEME} from "../utilities/theme";
import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {KeyboardAvoidLayout} from "./KeyboardAvoidLayout";

export const RegisterLayout = ({children, title}) => {
    return (
        <LinearGradient
            colors={[THEME.gradient.left, THEME.gradient.right]}
            style={styles.bgImage}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <SafeAreaView style={styles.safeContainer}>
                <KeyboardAvoidLayout>
                    <View style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                        {children}
                    </View>
                </KeyboardAvoidLayout>
            </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    safeContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 15 : 0,
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: 'center'
    },
    title: {
        fontSize: 52,
        color: THEME.lightBg,
        fontWeight: 'bold',
        marginBottom: 20
    }
});
