import {StyleSheet, TouchableOpacity, View, Image} from "react-native";
import {RegisterLayout} from "../layouts/RegisterLayout";
import {MyButton} from "../components/MyButton";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {MyInput} from "../components/MyInput";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {useDispatch, useSelector} from "react-redux";
import {getDatabase, ref, set} from "firebase/database";
import {setActiveUser} from "../store/UserSlice";
import {getImageFromFirebaseStore} from "../utilities/getImageFromFirebaseStore";
import {ErrorBlock} from "../components/ErrorBlock";

export const ChangeCredentialsPage = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const {activeUser} = useSelector(state => state.user)

    const [photo, setPhoto] = useState(activeUser ? activeUser.photoURL : null)

    const [name, setName] = useState(activeUser ? activeUser.name : '');

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const uploadPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)
        }
    };

    const save =  async () => {
        const db = getDatabase()
        setIsLoading(true)
        if (photo && photo !== activeUser.photoURL) {
            getImageFromFirebaseStore(photo, activeUser.uid)
                .then((imageUrl) => {
                    const userRef = ref(db, `users/${activeUser.id}`);
                    const updatedData = {
                        ...activeUser,
                        name: name,
                        photoURL: imageUrl
                    }
                    set(userRef, updatedData)
                        .then(() => {
                            dispatch(setActiveUser(updatedData))
                            console.log(`User data successfully updated`);
                            setIsLoading(false)
                            navigation.goBack()
                        })
                        .catch((error) => {
                            console.error(`Error updating user data`, error);
                            setError(error.message)
                            setIsLoading(false)
                        });

                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                    console.error("Error getting url", error);
                });
        } else {
            const userRef = ref(db, `users/${activeUser.id}`);
            const updatedData = {
                ...activeUser,
                name: name
            }
            set(userRef, updatedData)
                .then(() => {
                    dispatch(setActiveUser(updatedData))
                    setIsLoading(false)
                    navigation.goBack()
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                });
        }
    }


    return (
        <RegisterLayout title={isLoading ? 'Loading...' : 'Edit'}>
            {
                activeUser &&
                <>
                    <View style={styles.editImageWrapper}>
                        {
                            photo ?
                                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri: photo,
                                    }}
                                    resizeMode='contain'
                                />
                                :
                                <Image
                                    style={styles.avatar}
                                    source={require('../../assets/user.png')}
                                    resizeMode='contain'
                                />
                        }
                        <TouchableOpacity onPress={uploadPhoto} style={styles.editImageButton}>
                            <AntDesign name="plus" size={24} color={THEME.lightBg} />
                        </TouchableOpacity>
                    </View>

                    <ErrorBlock text={error} />

                    <MyInput
                        value={name}
                        placeholder={"Name"}
                        onChange={(text) => setName(text)}
                        icon={<AntDesign name="user" size={24} color={THEME.secondary} />}
                    />

                    <MyButton
                        style={{marginTop: 10}}
                        text={'Save changes'}
                        onPress={save}
                    />
                    <MyButton
                        style={{marginTop: 10}}
                        text={'Cansel'}
                        onPress={() => navigation.goBack()}
                        color={'gray'}
                    />
                </>
            }
        </RegisterLayout>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 150,
        height: 150,
        objectFit: 'cover',
        borderRadius: 100,
        marginBottom: 15
    },

    editImageWrapper: {
        marginBottom: 15
    },

    editImageButton: {
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 5,
        backgroundColor: THEME.secondary,
        borderWidth: 2,
        borderColor: THEME.lightBg
    },
})
