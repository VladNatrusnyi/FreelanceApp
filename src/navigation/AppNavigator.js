
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {StyleSheet, View, Text} from "react-native";
import {THEME} from "../utilities/theme";
import {FontAwesome} from "@expo/vector-icons";
import DeviceInfo from "react-native-device-info";
import {UserStack} from "./UserStack";
import { onAuthStateChanged } from "firebase/auth";
import {equalTo, get, getDatabase, orderByChild, query, ref} from "firebase/database";
import {auth} from "../config/firebase";
import {setActiveUser} from "../store/UserSlice";
import {DiscoverStack} from "./DiscoverStack";
import {HomeStack} from "./HomeStack";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setIsLoading(true);
            try {
                if (user) {
                    const uid = user.uid;
                    const db = getDatabase();
                    const userRef = ref(db, `users`);
                    const sortedQuery = query(userRef, orderByChild('uid'), equalTo(uid));

                    const snapshot = await get(sortedQuery);

                    if (snapshot.exists()) {
                        const userData = snapshot.val();

                        if (userData) {
                            const key = Object.keys(userData)[0];
                            dispatch(setActiveUser(userData[key]));
                            setIsLoading(false);
                        } else {
                            dispatch(setActiveUser(null));
                        }
                    } else {
                        setIsLoading(false);
                    }
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error.message);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);


    const hasNoPhysicalButtons = !DeviceInfo.hasNotch();

    const TabItem = ({focused, text, iconName}) => {
        return (
            <View style={styles.tabItemWrapper}>
                <FontAwesome name={iconName} size={26} color={focused ? THEME.primary : THEME.grayText} />
                <Text style={{...styles.tabItemText, color: focused ? THEME.primary : THEME.grayText}}>{text}</Text>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: THEME.lightBg,
                        paddingTop: !hasNoPhysicalButtons ? 15 : 0,
                        height: 75,
                        borderTopWidth: 1,
                        borderTopColor: THEME.primary
                    }
                }}

            >
                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabItem focused={focused} text={'Home'} iconName={'home'} />
                        ),
                    }}
                    name="Home"
                    component={HomeStack}
                />

                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabItem focused={focused} text={'Discover'} iconName={'search'} />
                        ),
                    }}
                    name="DiscoverStack"
                    component={DiscoverStack}
                />

                <Tab.Screen
                    options={{
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <TabItem focused={focused} text={'Profile'} iconName={'user-o'} />
                        ),
                    }}
                    name="UserStack"
                    component={UserStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabItemWrapper: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabItemText: {
        marginTop: 5,
        fontSize: 14,
    },
})
