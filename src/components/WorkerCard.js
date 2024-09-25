import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getProfession} from "../helpers/getProfession";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {useNavigation} from "@react-navigation/native";
import {calculateAverage} from "../utilities/calculateAverage";
import {useMemo} from "react";

export const WorkerCard = ({workerData}) => {
    const navigation = useNavigation()

    const rating = useMemo(() => {
        if (workerData) {
            const arr = (workerData.reviews && workerData.reviews.length) ? workerData.reviews.map(el => el.rating) : []
            return calculateAverage(arr)
        }
    }, [workerData])

    return (
        <TouchableOpacity onPress={() => navigation.navigate('WorkerPage', {workerUid: workerData.uid})}>
            <View style={styles.wrapper}>
                <View style={styles.leftPart}>
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
                    <View>
                        <Text style={styles.name}>{workerData.name} {workerData.surname}</Text>
                        <Text style={styles.profession}>{getProfession(workerData.specialityId)}</Text>
                    </View>
                </View>

                <View style={styles.rightPart}>
                    <Text style={styles.ratingText}>{rating}</Text>
                    <AntDesign name="star" size={24} color="orange" />
                </View>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        borderRadius: 15,
        marginBottom: 15,
    },
    leftPart: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    profession: {
        color: 'gray'
    },
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 15
    },


    rightPart: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: THEME.lightBg,
        borderRadius: 10
    },
    ratingText: {
        fontSize: 20,
    }
})