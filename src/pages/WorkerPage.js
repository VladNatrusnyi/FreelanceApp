import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {PageLayout} from "../layouts/PageLayout";
import {getProfession} from "../helpers/getProfession";
import {AntDesign, Feather} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {TextArea} from "../components/TextArea";
import {getDatabase, push, ref, remove, set} from "firebase/database";
import {ErrorBlock} from "../components/ErrorBlock";
import {StarRating} from "../components/StarRating";
import {ReviewList} from "../components/rewiews/ReviewList";

export const WorkerPage = ({route}) => {
    const navigation = useNavigation()
    const { workerUid } = route.params;

    const {activeUser} = useSelector(state => state.user)
    const { workers } = useSelector(state => state.workers)

    const [reviewText, setReviewText] = useState('')
    const [selectedStar, setSelectedStar] = useState(0);

    const [isOpenForm, setIsOpenForm] = useState(false)

    const workerData = useMemo(() => {
            if (workers) {
                return workers.find(worker => worker.uid === workerUid)
            }
        },
        [workerUid, workers])

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    const createReview = async () => {
        if (!selectedStar) {
            Alert.alert('Warning', 'You have not marked a rating. It necessarily.', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: async () => {
                }},
            ]);
        } else {
            setIsLoading(true)
            const db = getDatabase();
            const reviewRef = ref(db, `users/${workerData.id}/reviews`);

            const newReviewIdRef = await push(reviewRef);

            set(newReviewIdRef, {
                id: newReviewIdRef.key,
                creatorId: activeUser.uid,
                text: reviewText,
                rating: selectedStar,
                date: Date.now(),
            })
                .then(() => {
                    setIsLoading(false)
                    setError('')
                    setReviewText('')
                    setIsOpenForm(false)
                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                });
        }
    }


    return (
        <PageLayout
            headPart={<View style={styles.headWrapper}>
                {
                    workerData &&
                    <View style={styles.userWrapper}>
                        {
                            workerData.photoURL
                                ? <Image
                                    style={styles.userImage}
                                    source={{uri: workerData.photoURL }}
                                    resizeMode='cover'
                                />
                                : <Image
                                    style={styles.userImage}
                                    source={require('../../assets/user.png')}
                                    resizeMode='cover'
                                />
                        }
                        <View style={styles.nameBlockWrapper}>
                            <Text style={styles.userName}>{workerData.name}</Text>
                            <Text style={styles.userName}>{workerData.surname}</Text>
                            <Text style={styles.speciality}>{getProfession(workerData.specialityId)}</Text>
                        </View>
                    </View>
                }
            </View>}
        >
            {
                workerData &&
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView style={styles.scrollContainer}>

                 {/*Back button*/}
                <View style={styles.contentWrapper}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <View style={styles.iconWrapper}>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </View>
                        <Text style={styles.backBtnText}>Go Back</Text>
                    </TouchableOpacity>

                    {/*description*/}
                            <View style={styles.infoBlock}>
                                <Text style={styles.infoTitle}>Description</Text>
                                <View style={styles.decorator}></View>
                                <View style={styles.content}>
                                    {
                                        workerData.description
                                            ? <Text style={styles.description}>{workerData.description}</Text>
                                            : <Text style={styles.description}>This user has no description.</Text>
                                    }
                                </View>
                            </View>

                    {/*reviews Block*/}
                            <View style={styles.infoBlock}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={styles.infoTitle}>Reviews</Text>
                                    {
                                        (activeUser && workerUid !== activeUser.uid) &&
                                        <TouchableOpacity
                                            onPress={() => setIsOpenForm(!isOpenForm)}
                                            style={{marginRight: 10}}
                                        >
                                            <AntDesign name="plus" size={24} color="black" />
                                        </TouchableOpacity>
                                    }

                                </View>
                                <View style={styles.decorator}></View>
                                <View style={styles.content}>
                                    {/*review Form*/}
                                    {
                                        isOpenForm &&
                                        <View
                                            style={styles.createForm}
                                        >
                                            {
                                                isLoading &&
                                                <Text style={styles.loader}>Loading...</Text>
                                            }

                                            {
                                                error &&
                                                <ErrorBlock text={error} />
                                            }


                                            <StarRating
                                                selectedStar={selectedStar}
                                                setSelectedStar={(val) => setSelectedStar(val)}
                                            />


                                            <TextArea
                                                bgColor={THEME.gradient.right}
                                                customMaxHeight={150}
                                                customPlaceholder={'Review'}
                                                customValue={reviewText}
                                                onCustomChange={(text) => setReviewText(text)}
                                            />
                                            <View style={styles.formBtnBlock}>
                                                <TouchableOpacity onPress={() => setIsOpenForm(false)}>
                                                    <Text style={styles.formBtnTextCansel}>Cansel</Text>
                                                </TouchableOpacity>

                                                {
                                                    reviewText.trim() &&
                                                    <TouchableOpacity onPress={createReview}>
                                                        <Text style={styles.formBtnTextOK}>Publish</Text>
                                                    </TouchableOpacity>

                                                }
                                            </View>
                                        </View>
                                    }


                                    {/*reviews List*/}
                                    <ReviewList workerUid={workerUid} />
                                </View>
                            </View>

                </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            }
        </PageLayout>

    )
}

const styles = StyleSheet.create({
    loader: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 10
    },

    formBtnBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        justifyContent: "center"
    },
    starBlock: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    starItem: {},
    formBtnTextCansel: {
        fontSize: 16,
         color: 'gray'
    },
    formBtnTextOK: {
        fontSize: 16,
        color: THEME.secondary
    },

    createForm: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'lightgray'
    },

    scrollContainer: {
        flexGrow: 1,
    },
    content: {},
    description: {
        color: 'gray'
    },


    infoBlock: {
        marginVertical: 15
    },
    infoTitle: {
        fontSize: 16
    },
    decorator: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginVertical: 10
    },


    contentWrapper: {
        padding: 20,
    },
    iconWrapper: {
        padding: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    backBtnText: {
        fontSize: 16
    },


    headWrapper: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    nameBlockWrapper: {
        // alignItems: "center"
    },
    userName: {
        fontSize: 26,
        color: THEME.secondary,
        fontWeight: 'bold'
    },
    speciality: {
        color: '#737373'
    },
})


