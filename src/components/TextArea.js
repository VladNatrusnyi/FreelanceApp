import {TextInput, View, StyleSheet} from "react-native";
import {THEME} from "../utilities/theme";

export const TextArea = ({customPlaceholder, customValue, onCustomChange, customMaxHeight = 400, bgColor = THEME.secondary}) => {
    return (
        <View style={{...styles.customTextAreaContainer, maxHeight: customMaxHeight, backgroundColor: bgColor,}} >
            <TextInput
                style={styles.customTextArea}
                placeholder={customPlaceholder}
                placeholderTextColor="grey"
                multiline={true}
                value={customValue}
                onChangeText={(text) => onCustomChange(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    customTextAreaContainer: {
        borderRadius: 20,
        borderColor: THEME.lightBg,
        borderWidth: 2,
        padding: 20,
        marginBottom: 15,
        width: '100%',
    },
    customTextArea: {
        justifyContent: "flex-start",
        fontSize: 18,
        color: THEME.lightBg
    },
})
