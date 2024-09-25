import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "../../utilities/theme";
import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {getDatabase, ref, remove} from "firebase/database";

export const ReviewItem = ({reviewData, workerId}) => {
    const {activeUser} = useSelector(state => state.user)

    const { workers } = useSelector(state => state.workers)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const creatorData = useMemo(() => {
        if (workers) {
            return workers.find(el => el.uid === reviewData.creatorId)
        }
    }, [workers, reviewData])


    const deleteReview = () => {
        Alert.alert('Delete confirmation', 'Are you sure you want to delete your review?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: async () => {
                    setIsLoading(true);
                    try {
                        const db = getDatabase();
                        const answerRef = ref(db, `users/${workerId}/reviews/${reviewData.id}`);
                        await remove(answerRef);
                        setIsLoading(false);
                    } catch (error) {
                        setError(error.message);
                        setIsLoading(false);
                    }
                }},
        ]);
    }

    const renderStars = () => {
        const stars = [];

        for (let i = 0; i < 5; i++) {
            const isFilled = i < reviewData.rating;
            const starIcon = isFilled
                ? <AntDesign name="star" size={24} color={'orange'} />
                : <AntDesign name="staro" size={24} color={'orange'} />

            stars.push(
                <View
                    key={i}
                    style={styles.starItem}
                >
                    {starIcon}
                </View>
            );
        }

        return stars;
    };

    return (
        <View style={styles.wrapper}>
            {
                (creatorData && activeUser) &&
                <View style={styles.headerBlock}>
                    <View style={styles.userBlock}>
                        {
                            creatorData.photoURL
                                ? <Image
                                    style={styles.userImage}
                                    source={{uri: creatorData.photoURL }}
                                    resizeMode='cover'
                                />
                                : <Image
                                    style={styles.userImage}
                                    source={require('../../../assets/user.png')}
                                    resizeMode='cover'
                                />
                        }
                        <Text style={styles.name}>{creatorData.name} {creatorData.surname}</Text>
                    </View>

                    {
                        creatorData.uid === activeUser.uid &&
                        <TouchableOpacity
                            style={styles.removeIcon}
                            onPress={deleteReview}
                        >
                            <MaterialIcons name="delete" size={24} color={THEME.secondary} />
                        </TouchableOpacity>
                    }

                </View>
            }

            <Text>{reviewData.text}</Text>

            <View style={styles.ratingWrapper}>
                <View style={styles.starBlock}>
                    {renderStars()}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F7F7F7',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10
    },
    headerBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    userBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10

    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    name: {
        fontSize: 18,
        color: THEME.secondary
    },
    ratingWrapper: {
        alignSelf: 'flex-start'
    },
    starBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
    },
    removeIcon: {
        padding: 5
    }
})


