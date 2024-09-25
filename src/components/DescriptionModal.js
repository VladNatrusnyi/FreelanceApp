import {Modal, View, StyleSheet, Text} from "react-native";
import {KeyboardAvoidLayout} from "../layouts/KeyboardAvoidLayout";
import {MyButton} from "./MyButton";
import {THEME} from "../utilities/theme";
import {LinearGradient} from "expo-linear-gradient";
import {TextArea} from "./TextArea";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDatabase, ref, set} from "firebase/database";
import {setActiveUser} from "../store/UserSlice";
import {ErrorBlock} from "./ErrorBlock";

export const DescriptionModal = ({isVisible, onClose}) => {
    const dispatch = useDispatch()

    const {activeUser} = useSelector(state => state.user)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [customDescription, setCustomDescription] = useState(activeUser ? activeUser.description : '')

    const saveDescription = () => {
        const db = getDatabase()
        const userRef = ref(db, `users/${activeUser.id}`);
        const updatedUserData = {
            ...activeUser,
            description: customDescription.trim()
        }
        set(userRef, updatedUserData)
            .then(() => {
                dispatch(setActiveUser(updatedUserData))
                setIsLoading(false)
                onClose()
            })
            .catch((error) => {
                setIsLoading(false)
                setError(error.message)
            });
    }

    return (
        <Modal visible={isVisible} animationType="slide" transparent={false}>
            {
                activeUser &&
                <KeyboardAvoidLayout>
                    <LinearGradient
                        colors={[THEME.gradient.left, THEME.gradient.right]}
                        style={styles.customBgImage}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.customContainer}>
                            <View style={styles.customContent}>
                                {
                                    isLoading &&
                                    <Text style={styles.loader}>Loading...</Text>
                                }

                                <ErrorBlock text={error} />

                                <TextArea
                                    customPlaceholder={'Description'}
                                    customValue={customDescription}
                                    onCustomChange={(text) => setCustomDescription(text)}
                                />


                                <View style={styles.customModalBtnWrapper}>

                                    <MyButton
                                        style={{marginTop: 10, width: 100}}
                                        text={'Cancel'}
                                        onPress={() => {
                                            onClose()
                                        }}
                                        color={'gray'}
                                    />

                                    <MyButton
                                        style={{marginTop: 10, width: 100}}
                                        text={'Save'}
                                        onPress={saveDescription}
                                        color={THEME.gradient.left}
                                    />

                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                </KeyboardAvoidLayout>
            }
        </Modal>
    )
}

const styles = StyleSheet.create({
    loader: {
        color: THEME.lightBg,
        textAlign: "center",
        fontSize: 16
    },
    customBgImage: {
        flex: 1
    },
    customContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    customContent: {
        backgroundColor: THEME.secondary,
        borderWidth: 2,
        borderColor: THEME.lightBg,
        padding: 20,
        borderRadius: 20,
        width: '80%',
    },

    customModalBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        gap: 20,
        marginTop: 20
    },

    customTitle: {
        color: THEME.lightBg,
        fontSize: 22,
        marginBottom: 15
    },
    customWarning: {
        color: THEME.lightBg,
        marginBottom: 10
    },
    customPreloader: {
        textAlign: 'center',
        marginBottom: 15
    },
    customErrorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 15
    },
    customPasswordToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 15
    },
    customPasswordToggleText: {
        color: THEME.lightBg,
        fontSize: 16
    },
})
