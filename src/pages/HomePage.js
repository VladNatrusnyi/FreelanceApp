import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {PageLayout} from "../layouts/PageLayout";
import {THEME} from "../utilities/theme";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {getProfession} from "../helpers/getProfession";
import {Feather} from "@expo/vector-icons";
import {HomePageContent} from "../components/HomePageContent";
import {useEffect, useState} from "react";
import {setWorkers} from "../store/WorkersSlice";
import { getDatabase, query, ref, onValue } from "firebase/database";

export const HomePage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {activeUser} = useSelector(state => state.user)

    const { workers } = useSelector(state => state.workers)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const getWorkersFromDB = () => {
        setIsLoading(true)
        const db = getDatabase();
        const workersRef = query(ref(db, 'users'));
        onValue(workersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const usersArray = Object.keys(data).map((key) => data[key]);
                const res = usersArray.map(el => {
                    if (el.reviews) {
                        return {
                            ...el,
                            reviews: Object.keys(el.reviews).map((key) => el.reviews[key]).reverse()
                        }
                    } else {
                        return el
                    }
                })
                dispatch(setWorkers(res.reverse()));
                setIsLoading(false)
            } else {
                dispatch(setWorkers(null))
                setIsLoading(false)
            }
        });
    };


    useEffect(() => {
        getWorkersFromDB();
    }, [activeUser]);


    return (
       <PageLayout
           headPart={<View style={styles.headWrapper}>
               {
                   activeUser ?
                   <View style={styles.userWrapper}>
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
                       <View style={styles.nameBlockWrapper}>
                           <Text style={styles.userName}>{activeUser.name}</Text>
                           <Text style={styles.userName}>{activeUser.surname}</Text>
                           <Text style={styles.speciality}>{getProfession(activeUser.specialityId)}</Text>
                       </View>
                   </View>
                       : <View style={styles.userWrapper}>
                           <Image
                               style={styles.logoImage}
                               source={require('../../assets/item.png')}
                               resizeMode='cover'
                           />
                           <View style={styles.nameBlockWrapper}>
                               <Text style={styles.userName2}>Freelance App</Text>
                               <Text style={styles.userName3}>Find the necessary specialist.</Text>
                           </View>
                       </View>
               }

               {
                   activeUser
                       ? <TouchableOpacity
                           onPress={() => navigation.navigate('DiscoverStack')}
                           style={styles.searchWrapper}
                       >
                           <Feather name="search" size={24} color={THEME.lightBg} />
                       </TouchableOpacity>
                       : null

               }

           </View>}
       >
           {
               isLoading &&
               <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                   <Text>Loading...</Text>
               </View>
           }

                   <HomePageContent />

       </PageLayout>
    )
}

const styles = StyleSheet.create({
    headWrapper: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    nameBlockWrapper: {
        // alignItems: "center"
    },
    userName: {
        fontSize: 26,
        color: THEME.secondary,
        fontWeight: 'bold'
    },
    userName2: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
        color: THEME.lightBg
    },
    userName3: {
        fontSize: 16,
        color: THEME.secondary,
    },
    logoImage: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    speciality: {
        color: '#737373'
    },

    searchWrapper: {
        padding: 10,
        borderWidth: 2,
        borderColor: THEME.lightBg,
        borderRadius: 100
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
    customTextArea: {
        justifyContent: "flex-start",
        fontSize: 18,
        color: THEME.lightBg
    },
})
