import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "../utilities/theme";
import {Feather} from "@expo/vector-icons";

export const ProfileInfoBlock = ({headTitle, children, onEditPress, isEditBtnShow = true}) => {
    return (
        <View style={styles.wrapper}>
            {
                <View style={styles.headBlock}>
                    <Text style={styles.headTitle}>{headTitle}</Text>
                    {
                        isEditBtnShow &&
                        <TouchableOpacity onPress={onEditPress} style={[styles.editBtn]}>
                            <Feather name="edit" size={20} color={THEME.secondary} />
                            <Text style={styles.editBtnText}>Edit</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
            <View style={styles.content}>{children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        backgroundColor: '#F7F7F7',
        width: '100%',
        borderRadius: 15,
        marginBottom: 15
    },

    headBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    headTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    editBtnText: {
        color: THEME.secondary
    }

})