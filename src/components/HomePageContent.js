import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from "react-native";
import {MyButton} from "./MyButton";
import {useNavigation} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {SpecialityListItem} from "./SpecialityListItem";
import {specialities} from "../mock/specialities";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSpeciality} from "../store/FiltersSlice";
import {calculateAverage} from "../utilities/calculateAverage";
import {TopWorkerCard} from "./TopWorkerCard";

export const HomePageContent = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {activeUser} = useSelector(state => state.user)

    const { workers } = useSelector(state => state.workers)

    const [isShowAllCategories, setIsShowAllCategories] = useState(false)

    const topWorkers = useMemo(() => {
        if (workers) {
            return workers.filter(el => el.specialityId !== '111').map(el => {
                const arr = (el.reviews && el.reviews.length) ? el.reviews.map(el => el.rating) : [];
                const workerRating = calculateAverage(arr)
                return {
                    ...el,
                    rating: workerRating
                }
            }).sort((a, b) => b.rating - a.rating).slice(0, 6);
        }
    }, [workers])

    return (
        <ScrollView style={styles.wrapper}>

                {
                    !activeUser &&
                    <View style={styles.joinWrapper}>
                        <Image
                            style={{width: 100, height: 100, borderRadius: 100}}
                            source={require('../../assets/joinUser.png')}
                            resizeMode='cover'
                        />
                            <View>
                                <Text style={styles.joinTitle}>Join us as a specialist.</Text>
                                <Text style={styles.joinSubtitle}>Show off your skills to others.</Text>
                                <MyButton
                                    style={{marginTop: 10}}
                                    text={'Join Now'}
                                    onPress={() => navigation.navigate('UserStack')}
                                />
                            </View>
                    </View>

                }


            <View style={styles.specialistCategories}>
                <View style={{marginBottom: 10}}>
                    <View style={styles.specialistNav}>
                        <Text style={styles.categoriesTitle}>Specialist categories</Text>
                        <TouchableOpacity
                            onPress={() => setIsShowAllCategories(!isShowAllCategories)}
                            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                        >
                            <Text style={{color: THEME.secondary, fontSize: 16}}>
                                {isShowAllCategories ? 'Hide' : 'View all'}
                            </Text>
                            <AntDesign name="right" size={24} color={THEME.secondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={isShowAllCategories ? {} : styles.specialityWrapper}>
                        {
                            specialities.filter(el => el.value !== '111').map(el => {
                                return (
                                    <SpecialityListItem
                                        onPress={() => {
                                            dispatch(setSpeciality(el.value))
                                            navigation.navigate('DiscoverStack')
                                        }}
                                        key={el.value}
                                        data={el}
                                    />
                                )
                            })
                        }
                    </View>
                </View>

                <View>
                    <View style={styles.specialistNav}>
                        <Text style={styles.categoriesTitle}>Top specialists</Text>
                        <View
                            style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                        >


                            <TouchableOpacity onPress={() => navigation.navigate('DiscoverStack')}>
                                <Text style={{color: THEME.secondary, fontSize: 16}}>View all</Text>
                            </TouchableOpacity>
                            <AntDesign name="right" size={24} color={THEME.secondary} />
                        </View>
                    </View>
                    {
                        topWorkers ?
                        <FlatList
                            horizontal
                            data={topWorkers}
                            keyExtractor={(worker) => worker.id.toString()}
                            renderItem={({ item: worker }) => (
                                <TopWorkerCard workerData={worker} />
                            )}
                        />
                            : <Text>Not found</Text>
                    }
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 10,
    },
    joinWrapper: {
        backgroundColor: '#F7F7F7',
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    joinTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    joinSubtitle: {
        color: 'gray'
    },


    specialistCategories: {
        paddingVertical: 20
    },
    specialistNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    categoriesTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },



    specialityWrapper: {
        height: 185,
        overflow: "hidden"
    },
})
