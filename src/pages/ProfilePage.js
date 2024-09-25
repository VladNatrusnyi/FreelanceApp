import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Button, SafeAreaView} from "react-native";
import {PageLayout} from "../layouts/PageLayout";
import {THEME} from "../utilities/theme";
import {ProfileInfoBlock} from "../components/ProfileInfoBlock";
import {ChangeCredentialsPage} from "./ChangeCredentialsPage";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {getProfession} from "../helpers/getProfession";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useCallback, useRef, useState} from "react";
import {signOut} from "firebase/auth";

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {DeleteProfileForm} from "../components/DeleteProfileForm";
import {auth} from "../config/firebase";
import {USER_LOGOUT} from "../store";
import {ErrorBlock} from "../components/ErrorBlock";
import {DescriptionModal} from "../components/DescriptionModal";
import {ReviewList} from "../components/rewiews/ReviewList";


export const ProfilePage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {activeUser} = useSelector(state => state.user)

    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            setSize(220)
        }
    }, []);

    const handleCloseModalPress = useCallback(() => {
        setSize(200)
        bottomSheetModalRef.current?.dismiss();
    }, []);

    const [size, setSize] = useState(220)
    const toggleSize = () => {
        const newSize = size === 220 ? '90%' : 220
        setSize(newSize)
    }


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    const onSignOut = () => {
        setIsLoading(true)
        signOut(auth).then( async () => {
            dispatch({type: USER_LOGOUT})
            handleCloseModalPress()
            setIsLoading(false)
            navigation.navigate('Home')
        }).catch((error) => {
            setIsLoading(false)
            setError(error.message)
        });
    };


    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <DescriptionModal
                onClose={() => setModalVisible(false)}
                isVisible={modalVisible}
            />
            <BottomSheetModalProvider>
                    <BottomSheetModal
                        backgroundStyle={{backgroundColor: THEME.gradient.left}}
                        ref={bottomSheetModalRef}
                        snapPoints={[size]}
                        onChange={handleSheetChanges}
                        enablePanDownToClose={true}
                    >
                        <View style={styles.contentContainer}>

                            <ErrorBlock text={error} />

                            {
                                isLoading &&
                                <Text style={styles.loader}>Loading...</Text>
                            }


                            <TouchableOpacity
                                style={styles.btBtnWrapper}
                                onPress={toggleSize}
                            >
                                <Text style={styles.btBtnText}>Delete account</Text>
                                <Ionicons name="chevron-down-sharp" size={28} color={THEME.lightBg} />
                            </TouchableOpacity>

                            {
                                size !== 220 && <DeleteProfileForm />
                            }


                            <TouchableOpacity
                                onPress={onSignOut}
                                style={styles.btBtnWrapper}
                            >
                                <Text style={styles.btBtnText}>Sign Out</Text>
                                <MaterialIcons name="logout" size={28} color={THEME.lightBg} />
                            </TouchableOpacity>

                        </View>
                    </BottomSheetModal>
            {
                activeUser &&
                <PageLayout
                    headPart={<View style={styles.headWrapper}>
                        <TouchableOpacity
                            onPress={handlePresentModalPress}
                            style={styles.settingsBtn}
                        >
                            <Ionicons name="settings-outline" size={28} color={THEME.lightBg} />
                        </TouchableOpacity>
                        {
                            activeUser.photoURL
                                ? <Image
                                    style={styles.userImage}
                                    source={{uri: activeUser.photoURL }}
                                    resizeMode='cover'
                                />
                                : <Image
                                    style={styles.userImage}
                                    source={require('../../assets/user.png')}
                                    resizeMode='cover'
                                />
                        }
                    </View>}
                >
                    <ScrollView>
                        <View style={styles.mainWrapper}>

                            <ProfileInfoBlock
                                onEditPress={() => { navigation.navigate('ChangeCredentialsPage')}}
                                headTitle={'Credentials'}
                            >
                                <View style={styles.nameBlockWrapper}>
                                    <Text style={styles.userName}>{activeUser.name} {activeUser.surname}</Text>
                                    <View style={styles.decor}></View>
                                    <Text style={styles.speciality}>{getProfession(activeUser.specialityId)}</Text>
                                </View>
                            </ProfileInfoBlock>


                            <ProfileInfoBlock
                                onEditPress={() => setModalVisible(true)}
                                headTitle={activeUser.specialityId === '1' ? 'Notes' : 'Description'}
                            >
                                {
                                    activeUser.description
                                        ? <Text style={styles.descriptionText}>{activeUser.description}</Text>
                                        : <Text style={styles.additionalText}>Add a detailed description of yourself and your skills.</Text>
                                }
                            </ProfileInfoBlock>


                            {
                                activeUser.specialityId !== '1' &&
                                <ProfileInfoBlock isEditBtnShow={false} headTitle={'Reviews'}>
                                    <ReviewList workerUid={activeUser.uid} />
                                </ProfileInfoBlock>
                            }

                        </View>
                    </ScrollView>
                </PageLayout>
            }
            </BottomSheetModalProvider>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    btBtnWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 2,
        borderColor: THEME.lightBg,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: THEME.gradient.right
    },
    btBtnText: {
        color: THEME.lightBg,
        fontSize: 16
    },
    loader: {
        textAlign: "center",
        color: THEME.secondary,
        marginBottom: 10,
        fontSize: 16
    },



    headWrapper: {
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    settingsBtn: {
        padding: 5,
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 30
    },
    mainWrapper: {
        flex: 1,
        alignItems: 'center',
        padding: 20
        // justifyContent: "center",
    },

    decor: {
        borderBottomWidth: 1,
        borderColor: '#737373',
        width: '100%',
        marginVertical: 5
    },


    userImage: {
        height: 100,
        width: 100,
        borderRadius: 100
        // height: '100%',
    },

    //name block
    nameBlockWrapper: {
        alignItems: "center"
    },
    userName: {
        fontSize: 28,
        color: THEME.secondary,
    },
    speciality: {
        color: '#737373'
    },


    //description block
    descriptionText: {
        color: '#737373'
    },

    additionalText: {
        textAlign: 'center',
        color: '#737373'
    },
})
