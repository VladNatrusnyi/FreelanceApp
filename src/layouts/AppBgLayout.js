
import { StyleSheet, Platform, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {THEME} from "../utilities/theme";

export const AppBgLayout = ({children}) => {
    return (
        <LinearGradient
            colors={[THEME.gradient.left, THEME.gradient.right]}
            style={styles.bgImage}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={styles.safeContainer}>
                {children}
            </View>
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
        paddingTop: Platform.OS === 'android' ? 15 : 0
    },
});
