import {View, StyleSheet, Text, Platform, KeyboardAvoidingView} from "react-native";
import {MyInput} from "./MyInput";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {ErrorBlock} from "./ErrorBlock";
import {useState} from "react";
import {MyButton} from "./MyButton";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {USER_LOGOUT} from "../store";
import {deleteUser, getAuth, reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {getDatabase, ref, remove} from "firebase/database";
import { getStorage, ref as storeRef, deleteObject } from "firebase/storage";


export const DeleteProfileForm = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {activeUser} = useSelector(state => state.user)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [password, setPassword] = useState('');

    const deleteAccount = async () => {
        setLoading(true)
        try {
            const db = getDatabase();
            const auth = getAuth();
            const user = auth.currentUser;

            const credential = EmailAuthProvider.credential(user.email, password);

            await reauthenticateWithCredential(user, credential);

            await deleteUser(user);

            const userRef = ref(db, `users/${activeUser.id}`);
            await remove(userRef);

            const storage = getStorage();
            const desertRef = storeRef(storage, activeUser.uid);

           if (desertRef)  {
               await deleteObject(desertRef);
           }

            setLoading(false);

            dispatch({type: USER_LOGOUT})
            navigation.navigate('Home')
        } catch (error) {
            setError(`Error deleting account: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Deleting a profile</Text>
            <ErrorBlock text={error} />

            {
                loading &&
                <Text style={styles.loading}>Loading...</Text>
            }

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
            <MyInput
                value={password}
                placeholder={"Password"}
                onChange={(text) => setPassword(text)}
                icon={<AntDesign name="lock" size={24} color={THEME.secondary} />}
                isError={error}
            />
            </KeyboardAvoidingView>


            <MyButton
                text={'Delete'}
                onPress={deleteAccount}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: THEME.lightBg,
        marginBottom: 10
    },
    title: {
        color: THEME.secondary,
        fontSize: 16,
        fontWeight: 'bold'
    },
    loading: {
        textAlign: 'center',
        marginVertical: 10
    },
    warning: {
        color: 'red',
        marginBottom: 10
    },
})
