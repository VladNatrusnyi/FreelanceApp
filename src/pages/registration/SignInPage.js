
import {RegisterLayout} from "../../layouts/RegisterLayout";
import {MyInput} from "../../components/MyInput";
import {useState} from "react";
import {AntDesign, Fontisto} from "@expo/vector-icons";
import {THEME} from "../../utilities/theme";
import {MyButton} from "../../components/MyButton";
import {AdditionalBtnAuth} from "../../components/AdditionalBtnAuth";
import {ErrorBlock} from "../../components/ErrorBlock";
import {useNavigation} from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../config/firebase";

export const SignInPage = () => {
    const navigation = useNavigation()


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const SignIn = async () => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };



    return (
        <RegisterLayout title={isLoading ? 'Loading...' : 'Sign In'}>
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

            <ErrorBlock text={error} />

            <MyButton
                style={{marginTop: 10}}
                text={'Sign In'}
                onPress={SignIn}
            />

            <AdditionalBtnAuth
                style={{alignSelf: 'flex-end', marginTop: 30}}
                onPress={() => navigation.navigate('SignUpPage')}
                text={'Sign Up'}
            />
        </RegisterLayout>
    )
}