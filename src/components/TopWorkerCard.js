import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {THEME} from "../utilities/theme";
import {getProfession} from "../helpers/getProfession";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export const TopWorkerCard = ({workerData}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('TopWorkerPage', {workerUid: workerData.uid})}
            style={styles.wrapper}
        >
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

            <View style={styles.rightPart}>
                <Text style={styles.ratingText}>{workerData.rating}</Text>
                <AntDesign name="star" size={24} color="orange" />
            </View>

            <Text style={styles.name}>{workerData.name} {workerData.surname}</Text>
            <Text style={styles.profession}>{getProfession(workerData.specialityId)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 200,
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: THEME.secondary,
        marginRight: 15,
        alignItems: "center"
    },
    userImage: {
        width: 90,
        height: 90,
        borderRadius: 10
    },
    name: {
        fontSize: 16,
        color: THEME.secondary,
        marginVertical: 5
    },
    profession: {},

    rightPart: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: THEME.secondary,
        borderRadius: 10
    },
    ratingText: {
        fontSize: 20,
        color: THEME.lightBg
    }
})
