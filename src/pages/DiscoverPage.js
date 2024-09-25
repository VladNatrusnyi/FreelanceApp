import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {PageLayout} from "../layouts/PageLayout";
import {AntDesign, Feather} from "@expo/vector-icons";
import {THEME} from "../utilities/theme";
import {MyInput} from "../components/MyInput";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {KeyboardAvoidLayout} from "../layouts/KeyboardAvoidLayout";
import {useDispatch, useSelector} from "react-redux";
import {WorkerCard} from "../components/WorkerCard";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {RatingRadioButton} from "../components/RatingRadioButton";
import {SpecialityDropdown} from "../components/SpecialityDropdown";
import {MyButton} from "../components/MyButton";
import {clearFilters, setSpeciality} from "../store/FiltersSlice";
import {calculateAverage} from "../utilities/calculateAverage";
import {specialities} from "../mock/specialities";

export const DiscoverPage = ({route}) => {
    const dispatch = useDispatch()

    const { workers } = useSelector(state => state.workers)

    const [filteredWorkers, setFilteredWorkers] = useState(workers)

    const {speciality, rating} = useSelector(state => state.filters)
    const [search, setSearch] = useState('');

    const isFiltersExist = useMemo(() => {
        return speciality || rating
    }, [speciality, rating])


    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => [400], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);
    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);


    useEffect(() => {
        if (workers) {
            applyFilters()
        }
    }, [speciality, rating, workers]);

    const workersDataArr = useMemo(() => {
        if (filteredWorkers) {
            if (search.trim()) {
                return filteredWorkers
                    .filter(el => `${el.name}${el.surname}`.toLowerCase().includes(search.toLowerCase())).map(el => {
                        const arr = (el.reviews && el.reviews.length) ? el.reviews.map(el => el.rating) : [];
                        const workerRating = calculateAverage(arr)
                        return {
                            ...el,
                            rating: workerRating
                        }
                    }).sort((a, b) => b.rating - a.rating)
            } else {
                return filteredWorkers.map(el => {
                    const arr = (el.reviews && el.reviews.length) ? el.reviews.map(el => el.rating) : [];
                    const workerRating = calculateAverage(arr)
                    return {
                        ...el,
                        rating: workerRating
                    }
                }).sort((a, b) => b.rating - a.rating)
            }
        } else {
            return []
        }
    }, [search, filteredWorkers, workers]);


    const applyFilters = () => {
        const res1 = speciality ? workers.filter(el => el.specialityId === speciality) : workers;

        const result = workers.filter(worker => {
            const arr = (worker.reviews && worker.reviews.length) ? worker.reviews.map(el => el.rating) : [];
            const workerRating = calculateAverage(arr);

            switch (rating) {
                case 4.5:
                    return workerRating >= 4.5;
                case 4:
                    return workerRating >= 4;
                case 3:
                    return workerRating >= 3;
                case 1:
                    return workerRating < 3;
                case 0:
                    return true;
                default:
                    return false;
            }
        });

        const finalResult = res1.filter(workerRes1 => result.some(workerResult => workerResult === workerRes1));
        setFilteredWorkers(finalResult)
    };


    return (
        <PageLayout>

            <BottomSheetModalProvider>
                <View style={{paddingBottom: Platform.OS === 'android' ? 20 : 0}}>
                    <BottomSheetModal
                        backgroundStyle={{ marginHorizontal: 10, borderWidth: 2 ,borderColor: THEME.gradient.left, backgroundColor: '#F7F7F7'}}
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>Filters</Text>

                            <Text style={styles.modalText}>Speciality</Text>
                            <SpecialityDropdown specialities={specialities.filter(el => el.value !== '111')} value={speciality} onChange={(id) => dispatch(setSpeciality(id))}/>

                            <Text style={styles.modalText}>Rating</Text>
                            <RatingRadioButton />

                            <View style={styles.modalBtnWrapper}>
                                <MyButton
                                    style={{margiTop: 10, width: 100}}
                                    text={'Clear'}
                                    onPress={() => dispatch(clearFilters())}
                                    color={'gray'}
                                />

                                {/*<MyButton*/}
                                {/*    style={{marginTop: 10, width: 100}}*/}
                                {/*    text={'Apply'}*/}
                                {/*    onPress={applyFilters}*/}
                                {/*    color={THEME.gradient.left}*/}
                                {/*/>*/}

                            </View>
                        </View>
                    </BottomSheetModal>
                </View>

            <View style={styles.wrapper}>
                    <View style={styles.headWrapper}>
                        <View style={{flex: 1}}>
                            <MyInput
                                value={search}
                                placeholder={"Search specialist"}
                                onChange={(text) => setSearch(text)}
                                icon={<AntDesign name="search1" size={24} color={THEME.secondary} />}
                                needBorder={true}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handlePresentModalPress}
                            style={styles.filterBtn}
                        >
                            {
                                isFiltersExist
                                    ? <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 100,
                                            backgroundColor: THEME.secondary,
                                        }}
                                    ></View>
                                    : null
                            }

                            <Feather name="filter" size={28} color={THEME.secondary} />
                        </TouchableOpacity>
                    </View>

                <KeyboardAvoidLayout>
                    {
                        workersDataArr &&
                        <View>
                            {
                                workersDataArr.length
                                    ? workersDataArr.filter(el => el.specialityId !== '111').map(worker => {
                                        return (
                                            <WorkerCard key={worker.id} workerData={worker} />
                                        )
                                    })
                                    : <Text style={{textAlign: 'center'}}>Not found</Text>
                            }
                        </View>
                    }
                </KeyboardAvoidLayout>
            </View>
            </BottomSheetModalProvider>
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 30
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.secondary
    },
    modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        color: THEME.secondary
    },
    modalBtnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'center'
    },

    wrapper: {
        margin: 10,
        flex: 1,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    headWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    filterBtn: {
        position: 'relative',
        paddingHorizontal: 10,
        paddingBottom: 15,
        alignItems: "center",
        justifyContent: 'center'
    }
})
