import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {useSelector} from "react-redux";
import {useMemo} from "react";

export const SpecialityListItem = ({data, onPress}) => {
    const { workers } = useSelector(state => state.workers)

    const countOfWorkers = useMemo(() => {
        if (workers) {
            return workers.filter(worker => worker.specialityId === data.value).length
        } else {
            return '0'
        }
        },
        [workers, data])
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.wrapper}
        >
            <View>
                <Text style={styles.title}>{data.label}</Text>
                <Text style={styles.subtitle}>{countOfWorkers} specialists</Text>
            </View>
            <AntDesign name="right" size={24} color={THEME.secondary} />
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        color: 'gray'
    }
})