import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {auth} from "../../config/firebase";
import {RegisterLayout} from "../../layouts/RegisterLayout";
import {MyInput} from "../../components/MyInput";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../../utilities/theme";
import {ErrorBlock} from "../../components/ErrorBlock";
import {MyButton} from "../../components/MyButton";
import {AdditionalBtnAuth} from "../../components/AdditionalBtnAuth";
import {useDispatch} from "react-redux";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
import {setActiveUser} from "../../store/UserSlice";
import {Alert} from "react-native";
import {SpecialityDropdown} from "../../components/SpecialityDropdown";
import {specialities} from "../../mock/specialities";

export const SignUpPage = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialityId, setSpecialityId] = useState(null);


    const SignUp = () => {
        if (!name.trim() || !surname.trim() || !email.trim() || !password.trim()|| !specialityId || password.length < 6) {
            Alert.alert('Error', `All fields are mandatory. The password must contain at least 6 characters.`, [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        } else {
            setIsLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    const db = getDatabase();
                    const usersRef = ref(db, 'users');

                    const newUserRef = push(usersRef);
                    const newUserId = newUserRef.key;

                    const userData = {
                        name: name,
                        surname: surname,
                        description: '',
                        email: user.email,
                        specialityId: specialityId ? specialityId : '',
                        uid: user.uid,
                        id: newUserId,
                        photoURL: '',
                    };

                    set(newUserRef, userData)
                        .then(async () => {
                            dispatch(setActiveUser(userData))

                            setIsLoading(false)
                        })
                        .catch((error) => {
                            setIsLoading(false)
                            setError(error.message)
                            console.log('Error adding new user to db:', error.message);
                        });


                })
                .catch((error) => {
                    setIsLoading(false)
                    setError(error.message)
                    console.log('ERROR Registered user in auth', error.message)
                });
        }
    };



    return (
        <RegisterLayout title={isLoading ? 'Loading...' : 'Sign Up'}>

            <MyInput
                value={name}
                placeholder={"Name"}
                onChange={(text) => setName(text)}
                icon={<AntDesign name="user" size={24} color={THEME.secondary} />}
                isError={error}
            />

            <MyInput
                value={surname}
                placeholder={"Surname"}
                onChange={(text) => setSurname(text)}
                icon={<AntDesign name="user" size={24} color={THEME.secondary} />}
                isError={error}
            />


            <MyInput
                value={email}
                placeholder={"Email"}
                onChange={(text) => setEmail(text)}
                icon={<AntDesign name="mail" size={24} color={THEME.secondary} />}
                isError={error}
            />

            <MyInput
                value={password}
                placeholder={"Password"}
                onChange={(text) => setPassword(text)}
                icon={<AntDesign name="lock" size={24} color={THEME.secondary} />}
                isError={error}
            />


            <SpecialityDropdown specialities={specialities} value={specialityId} onChange={(id) => setSpecialityId(id)}/>

            <ErrorBlock text={error} />

            <MyButton
                style={{marginTop: 10}}
                text={'Sign Up'}
                onPress={SignUp}
            />

            <AdditionalBtnAuth
                style={{alignSelf: 'flex-end', marginTop: 30}}
                onPress={() => navigation.navigate('SignInPage')}
                text={'Sign In'}
                reverse={true}
            />
        </RegisterLayout>
    )
}
